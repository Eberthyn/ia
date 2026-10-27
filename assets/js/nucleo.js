/* =====================================================================
   NÚCLEO
   Lê curso.config.js, monta a lista linear de páginas e oferece os
   utilitários usados pelos componentes.
   ===================================================================== */
(function () {
  const config = window.CURSO_CONFIG;
  const { raiz } = window.Curso;

  /** Escapa texto para uso seguro dentro de HTML. */
  const esc = (texto = "") =>
    String(texto).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );

  /** Caminho da raiz do curso -> URL absoluta. */
  const url = (caminho) => raiz + caminho;

  // ---- Lista linear de páginas (ordem de navegação) -------------------
  const paginas = [];
  const nova = (dados) => {
    const pagina = { ...dados, url: dados.arquivo ? url(dados.arquivo) : null };
    paginas.push(pagina);
    return pagina;
  };

  nova({
    tipo: "home",
    arquivo: config.home,
    rotulo: "Início",
    rotuloNav: config.rotuloHome || "Página Inicial",
  });

  config.modulos.forEach((modulo) => {
    const n = modulo.numero;
    modulo.paginas = [];
    const doModulo = (dados) => modulo.paginas.push(nova({ modulo, ...dados }));

    if (modulo.introducao) {
      doModulo({
        tipo: "intro",
        ...modulo.introducao,
        rotulo: "Introdução",
        rotuloNav: `Introdução Módulo ${n}`,
      });
    }
    (modulo.aulas || []).forEach((aula, i) => {
      doModulo({
        tipo: "aula",
        ...aula,
        numero: i + 1,
        rotulo: `Aula ${i + 1}`,
        rotuloNav: `Módulo ${n} Aula ${i + 1}`,
      });
    });
    if (modulo.resumo) {
      doModulo({
        tipo: "resumo",
        ...modulo.resumo,
        rotulo: "Resumo do Módulo",
        rotuloTrilha: "Resumo",
        rotuloNav: `Resumo Módulo ${n}`,
      });
    }
  });

  if (config.encerramento) {
    nova({
      tipo: "encerramento",
      ...config.encerramento,
      rotulo: "Encerramento",
      rotuloNav: "Encerramento",
    });
  }

  // Páginas extras (créditos, referências…) ficam fora da sequência.
  const extras = (config.extras || []).map((extra) => ({
    tipo: "extra",
    ...extra,
    url: extra.arquivo ? url(extra.arquivo) : null,
  }));

  // ---- Página atual ---------------------------------------------------
  const endereco = location.href.split(/[?#]/)[0];
  const ehAtual = (p) =>
    p.url && (p.url === endereco || (p.tipo === "home" && endereco === raiz));
  const atual = paginas.find(ehAtual) || extras.find(ehAtual) || null;

  const indice = paginas.indexOf(atual);
  const anterior = indice > 0 ? paginas[indice - 1] : null;
  const proxima =
    indice >= 0 && indice < paginas.length - 1 ? paginas[indice + 1] : null;

  // ---- Base dos componentes -------------------------------------------
  /** Garante que montar() rode uma única vez, mesmo se o elemento for movido. */
  class Componente extends HTMLElement {
    connectedCallback() {
      if (this.montado) return;
      this.montado = true;
      this.montar();
    }
    /** Lê um atributo com valor padrão. */
    attr(nome, padrao = "") {
      return this.getAttribute(nome) ?? padrao;
    }
  }

  const definir = (nome, classe) => customElements.define(nome, classe);
  const icone = (nome) => `<i class="bi bi-${nome}" aria-hidden="true"></i>`;

  /** Gera ids únicos para ligar botões e painéis (aria-controls etc.). */
  let contador = 0;
  const novoId = (prefixo) => `${prefixo}-${++contador}`;

  /**
   * Lê os <curso-item> filhos de um componente (abas, acordeão, carrossel…).
   * O título vem do atributo "titulo" ou, se precisar de formatação
   * (itálico, negrito), de um filho <curso-titulo>.
   * Retorna { titulo (HTML), conteudo (nós), item }.
   */
  const lerItens = (elemento) =>
    [...elemento.querySelectorAll(":scope > curso-item")].map((item) => {
      const tituloEl = item.querySelector(":scope > curso-titulo");
      const titulo = tituloEl
        ? tituloEl.innerHTML.trim()
        : esc(item.getAttribute("titulo") || "");
      if (tituloEl) tituloEl.remove();
      return { titulo, conteudo: [...item.childNodes], item };
    });

  /**
   * Linha "Fonte: …" de figuras e tabelas.
   * Com "fonte-link", o texto da fonte vira link (abre em nova aba).
   */
  const fonteHtml = (elemento) => {
    const fonte = elemento.getAttribute("fonte");
    if (!fonte) return "";
    const link = elemento.getAttribute("fonte-link");
    const texto = link
      ? `<a href="${esc(link)}" target="_blank" rel="noopener">${esc(fonte)}</a>`
      : esc(fonte);
    return `<p class="figura__fonte">Fonte: ${texto}</p>`;
  };

  /** Cria um elemento com classe e, opcionalmente, nós filhos. */
  const criar = (tag, classe, filhos = []) => {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    el.append(...filhos);
    return el;
  };

  /**
   * Cria uma janela modal no <body> e devolve o elemento.
   * Usada por <curso-modal> e pelos componentes que abrem modal ao clicar
   * (matriz, círculos). "conteudo" é uma lista de nós; "titulo" aceita HTML.
   */
  const criarModal = ({ id = novoId("modal"), titulo = "", conteudo = [], imagem = "", alt = "" }) => {
    const tituloId = `${id}-titulo`;
    const corpo = criar("div", "modal-curso__texto", conteudo);
    corpo.insertAdjacentHTML("afterbegin", `<h2 class="modal-curso__titulo" id="${tituloId}">${titulo}</h2>`);

    const janela = criar("div", "modal fade modal-curso");
    Object.assign(janela, { id, tabIndex: -1 });
    janela.setAttribute("aria-labelledby", tituloId);
    janela.setAttribute("aria-hidden", "true");
    janela.innerHTML = `
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ${imagem ? "modal-lg" : ""}">
        <div class="modal-content">
          <button type="button" class="btn-close modal-curso__fechar" data-bs-dismiss="modal" aria-label="Fechar"></button>
          <div class="modal-body modal-curso__corpo ${imagem ? "modal-curso__corpo--imagem" : ""}">
            ${imagem ? `<img class="modal-curso__imagem" src="${esc(imagem)}" alt="${esc(alt)}">` : ""}
          </div>
        </div>
      </div>`;
    janela.querySelector(".modal-body").append(corpo);
    // Fica no <body> para não ser afetado pelo layout da página
    document.body.append(janela);
    return janela;
  };

  /** Abre a janela criada por criarModal(). */
  const abrirModal = (janela) => bootstrap.Modal.getOrCreateInstance(janela).show();

  Object.assign(window.Curso, {
    config,
    paginas,
    extras,
    atual,
    anterior,
    proxima,
    home: paginas[0],
    esc,
    url,
    icone,
    definir,
    Componente,
    novoId,
    lerItens,
    criar,
    criarModal,
    abrirModal,
    fonteHtml,
  });
})();
