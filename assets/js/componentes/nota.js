/* <curso-nota [titulo="..."]> …texto… </curso-nota>
   Faixa azul de alerta. Pode ter só título, só texto ou os dois. */
(function () {
  const { Componente, definir, esc, criar } = window.Curso;

  definir('curso-nota', class extends Componente {
    montar() {
      const nota = criar('aside', 'nota');
      if (this.hasAttribute('titulo')) nota.innerHTML = `<p class="nota__titulo">${esc(this.attr('titulo'))}</p>`;
      if (this.childNodes.length) nota.append(criar('div', 'nota__corpo', [...this.childNodes]));
      this.replaceChildren(nota);
    }
  });
})();
