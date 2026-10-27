/* <curso-figura titulo="..." src="..." alt="..." fonte="..." [fonte-link="..."] [legenda="..."] [larga] [ampliar]>
    [texto da legenda]
   </curso-figura>
   Imagem, gráfico ou foto.
   - titulo: aparece acima da imagem (ou <curso-titulo> para usar itálico etc.).
   - legenda + conteúdo interno: aparecem abaixo da imagem (título rosa e texto).
   - ampliar: mostra a lupa; ao clicar, a imagem abre ampliada na mesma página,
     em fundo branco, e fecha voltando ao ponto da leitura (infográficos).
   - larga: ocupa toda a largura do conteúdo (fluxogramas, linhas do tempo,
     quadros). Figuras largas também ganham a lupa.     ao clicar (fluxogramas, linhas do tempo, quadros).
   Sem "src" mostra um espaço reservado (útil enquanto a arte não chega). */
(function () {
  const { Componente, definir, esc, criar, fonteHtml, icone } = window.Curso;

  // Janela única de ampliação, criada na primeira vez que for usada
  let janela = null;
  const ampliar = (src, alt) => {
    if (!janela) {
      janela = criar('div', 'modal fade ampliacao');
      janela.tabIndex = -1;
      janela.setAttribute('aria-label', 'Imagem ampliada');
      janela.innerHTML = `
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <button type="button" class="ampliacao__fechar" data-bs-dismiss="modal" aria-label="Fechar imagem ampliada">${icone('x-lg')}</button>
            <div class="modal-body ampliacao__corpo"><img class="ampliacao__imagem" alt=""></div>
          </div>
        </div>`;
      document.body.append(janela);
    }
    const img = janela.querySelector('.ampliacao__imagem');
    img.src = src;
    img.alt = alt;
    bootstrap.Modal.getOrCreateInstance(janela).show();
  };

  definir('curso-figura', class extends Componente {
    montar() {
      // Título com formatação (ex.: nome científico em itálico): use <curso-titulo>
      const tituloEl = this.querySelector(':scope > curso-titulo');
      const titulo = tituloEl ? tituloEl.innerHTML : esc(this.attr('titulo'));
      if (tituloEl) tituloEl.remove();
      // Audiodescrição: sai do conteúdo da legenda e vai para baixo da imagem
      const audiodescricao = this.querySelector(':scope > curso-audiodescricao');
      if (audiodescricao) audiodescricao.remove();
      const src = this.attr('src');
      const legenda = this.attr('legenda');
      const texto = [...this.childNodes].filter((n) => n.nodeType === 1 || n.textContent.trim());

      // Figuras largas (fluxogramas, quadros) abrem em tamanho real ao clicar — útil no celular
      const larga = this.hasAttribute('larga');
      const ampliavel = src && (larga || this.hasAttribute('ampliar'));
      const alt = this.attr('alt');

      const figura = criar('figure', `figura ${larga ? 'figura--larga' : ''} ${this.hasAttribute('estreita') ? 'figura--estreita' : ''}`);
      figura.innerHTML = `
        ${titulo ? `<figcaption class="figura__titulo">${titulo}</figcaption>` : ''}
        ${src
          ? `<img class="figura__imagem" src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
          : '<div class="figura__imagem figura__imagem--vazia" role="img" aria-label="Imagem a definir"></div>'}
        ${fonteHtml(this)}`;

      if (audiodescricao) figura.append(audiodescricao);

      if (legenda || texto.length) {
        const bloco = criar('div', 'figura__legenda', texto);
        if (legenda) bloco.insertAdjacentHTML('afterbegin', `<p class="figura__legenda-titulo">${esc(legenda)}</p>`);
        // Sem título acima, a legenda é que descreve a figura
        if (!titulo) {
          const caption = criar('figcaption', '', [bloco]);
          figura.append(caption);
        } else {
          figura.append(bloco);
        }
      }

      // Lupa: envolve a imagem num botão que abre a ampliação
      if (ampliavel) {
        const imagem = figura.querySelector('.figura__imagem');
        const botao = criar('button', 'figura__ampliar');
        botao.type = 'button';
        botao.setAttribute('aria-label', 'Ampliar imagem');
        imagem.replaceWith(botao);
        botao.append(imagem);
        botao.insertAdjacentHTML('beforeend', `<span class="figura__lupa" aria-hidden="true">${icone('zoom-in')} Ampliar</span>`);
        botao.addEventListener('click', () => ampliar(src, alt));
      }

      this.replaceChildren(figura);
    }
  });
})();
