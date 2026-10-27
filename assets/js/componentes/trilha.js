/* <curso-trilha>
   Trilha de navegação (breadcrumb): Home > Módulo 2 > Aula 1. */
(function () {
  const { Componente, definir, esc, home, atual } = window.Curso;

  definir('curso-trilha', class extends Componente {
    montar() {
      if (!atual || atual === home) return;

      const passos = [{ rotulo: 'Início', url: home.url }];
      if (atual.modulo) {
        const entrada = atual.modulo.paginas.find((p) => p.url);
        passos.push({ rotulo: `Módulo ${atual.modulo.numero}`, url: entrada && entrada.url });
      }
      passos.push({ rotulo: atual.rotuloTrilha || atual.rotulo, url: atual.url, atual: true });

      this.innerHTML = `
        <nav class="trilha" aria-label="Você está em">
          <ol>${passos.map((p) => `
            <li>${p.url
              ? `<a href="${p.url}" ${p.atual ? 'aria-current="page"' : ''}>${esc(p.rotulo)}</a>`
              : `<span>${esc(p.rotulo)}</span>`}</li>`).join('')}
          </ol>
        </nav>`;
    }
  });
})();
