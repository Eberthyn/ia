/* <curso-modulos>
   Cards dos módulos na home ("Estrutura do curso"), gerados de curso.config.js:
   cabeçalho "MÓDULO N", título, lista de aulas e botão "Iniciar Módulo N".
   Módulos com "emBreve: true" no config ganham a etiqueta "Em breve". */
(function () {
  const { Componente, definir, esc, config } = window.Curso;

  const aula = (pagina) => `
    <li><strong>${esc(pagina.rotulo)} -</strong> ${esc(pagina.titulo || '')}</li>`;

  const botao = (m) => {
    const entrada = m.paginas.find((p) => p.url);
    const texto = `Iniciar Módulo ${m.numero}`;
    return entrada
      ? `<a class="modulo-card__botao" href="${entrada.url}">${texto}</a>`
      : `<span class="modulo-card__botao" aria-disabled="true" title="Módulo ainda não disponível">${texto}</span>`;
  };

  const card = (m) => `
    <article class="modulo-card">
      <h3 class="modulo-card__numero">Módulo ${m.numero}
        ${m.emBreve ? '<span class="modulo-card__etiqueta">Em breve</span>' : ''}</h3>
      <p class="modulo-card__titulo">${esc(m.titulo)}</p>
      <ul class="modulo-card__lista">${m.paginas.filter((p) => p.tipo === 'aula').map(aula).join('')}</ul>
      ${botao(m)}
    </article>`;

  definir('curso-modulos', class extends Componente {
    montar() {
      this.innerHTML = `<div class="modulos">${config.modulos.map(card).join('')}</div>`;
    }
  });
})();
