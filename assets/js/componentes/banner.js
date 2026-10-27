/* <curso-banner [modulo="1"] [aula="2"] [grande]>
   Faixa com o título do curso à esquerda e a ilustração à direita.
   "modulo" mostra a tarja "MÓDULO 1" (e "| AULA 2" quando há "aula");
   "grande" é a versão da home, com a etiqueta "Curso" e os links extras. */
(function () {
  const { Componente, definir, esc, icone, url, config, extras, atual } = window.Curso;

  const link = (extra) => {
    const conteudo = `${icone(extra.icone)}<span>${esc(extra.rotulo)}</span>`;
    return extra.url
      ? `<a class="banner__link" href="${extra.url}" ${extra === atual ? 'aria-current="page"' : ''}>${conteudo}</a>`
      : `<span class="banner__link">${conteudo}</span>`;
  };

  definir('curso-banner', class extends Componente {
    montar() {
      const { chamada, destaque, complemento } = config.titulo;
      const grande = this.hasAttribute('grande');
      const modulo = this.attr('modulo');
      const aula = this.attr('aula');
      // Só a home usa <h1> no banner; nas demais o <h1> é o título da página.
      const tag = grande ? 'h1' : 'p';

      const tarja = modulo
        ? `<p class="banner__modulo">Módulo ${esc(modulo)}${aula ? ` | Aula ${esc(aula)}` : ''}</p>`
        : '';

      this.innerHTML = `
        <div class="banner ${grande ? 'banner--grande' : ''}">
          <div class="banner__miolo">
            <div class="banner__texto">
              ${grande ? '<span class="banner__selo">Curso</span>' : ''}
              <${tag} class="banner__titulo">
                <span class="banner__chamada">${esc(chamada)}</span>
                ${destaque.map((linha) => `<span class="banner__destaque">${esc(linha)}</span>`).join(' ')}
                ${complemento ? `<span class="banner__chamada">${esc(complemento)}</span>` : ''}
              </${tag}>
              ${grande ? `<nav class="banner__links" aria-label="Links do curso">${extras.map(link).join('')}</nav>` : ''}
            </div>
            <img class="banner__arte" src="${url('assets/img/banner-arte.png')}" alt="">
          </div>
          ${grande ? '<div class="banner__pixels" aria-hidden="true"></div>' : ''}
        </div>
        ${tarja}`;
    }
  });
})();
