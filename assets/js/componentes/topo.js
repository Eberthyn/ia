/* <curso-topo>
   Barra superior que só aparece no celular/tablet: botão do menu do curso.
   No desktop o menu lateral fica sempre visível e a barra some. */
(function () {
  const { Componente, definir, icone, home } = window.Curso;

  definir('curso-topo', class extends Componente {
    montar() {
      this.innerHTML = `
        <header class="topo d-lg-none">
          <button class="topo__menu" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#menu-curso" aria-controls="menu-curso">${icone('list')}<span>Menu do curso</span></button>
          <a class="topo__home" href="${home.url}" aria-label="Página inicial">${icone('house-door-fill')}</a>
        </header>`;
    }
  });
})();
