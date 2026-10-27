/* <curso-menu>
   Menu lateral gerado de curso.config.js. Marca a página atual, lista os
   links extras (Referências, Créditos…) no fim e vira painel deslizante
   (offcanvas) em telas pequenas.
   Com "menuAberto: true" no config, todos os módulos começam abertos. */
(function () {
  const { Componente, definir, esc, icone, config, paginas, extras, home, atual } = window.Curso;

  const corrente = (pagina) => (pagina === atual ? 'aria-current="page"' : '');

  /** Link quando a página existe; texto simples quando ainda não foi publicada. */
  const item = (pagina, conteudo, classe) =>
    pagina.url
      ? `<a class="${classe}" href="${pagina.url}" ${corrente(pagina)}>${conteudo}</a>`
      : `<span class="${classe}">${conteudo}</span>`;

  const itemDoModulo = (pagina) => {
    const titulo = pagina.titulo ? `<span class="menu__subtitulo">${esc(pagina.titulo)}</span>` : '';
    return `<li>${item(pagina, esc(pagina.rotulo) + titulo, 'menu__item')}</li>`;
  };

  const modulo = (m) => {
    const aberto = Boolean(config.menuAberto || (atual && atual.modulo === m));
    return `
    <section class="menu__modulo">
      <button class="menu__titulo ${aberto ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse"
        data-bs-target="#menu-modulo-${m.numero}" aria-expanded="${aberto}" aria-controls="menu-modulo-${m.numero}">
        Módulo ${m.numero} ${icone('caret-up-fill')}
      </button>
      <ol class="menu__lista collapse ${aberto ? 'show' : ''}" id="menu-modulo-${m.numero}">
        ${m.paginas.map(itemDoModulo).join('')}
      </ol>
    </section>`;
  };

  const extra = (e) => `<li>${item(e, `${icone(e.icone)} ${esc(e.rotulo)}`, 'menu__extra')}</li>`;

  definir('curso-menu', class extends Componente {
    montar() {
      const encerramento = paginas.find((p) => p.tipo === 'encerramento');

      this.innerHTML = `
        <aside class="menu offcanvas-lg offcanvas-start" id="menu-curso" tabindex="-1" aria-label="Menu do curso">
          <div class="offcanvas-header d-lg-none">
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#menu-curso" aria-label="Fechar menu"></button>
          </div>
          <nav class="menu__corpo" aria-label="Conteúdo do curso">
            <a class="menu__home" href="${home.url}">${icone('house-door-fill')} Página Inicial</a>
            ${config.modulos.map(modulo).join('')}
            ${encerramento ? item(encerramento, 'Encerramento', 'menu__titulo menu__titulo--link') : ''}
            ${extras.length ? `<ul class="menu__extras">${extras.map(extra).join('')}</ul>` : ''}
          </nav>
        </aside>`;
    }
  });
})();
