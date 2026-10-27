/* <curso-tabela titulo="..." fonte="..." [fonte-link="..."]>
     <table> …thead / tbody… </table>
   </curso-tabela>
   Aplica o estilo do curso, rolagem horizontal no celular, título e fonte.
   "listrada" alterna o fundo das linhas (bom para listas de uma coluna). */
(function () {
  const { Componente, definir, esc, criar, fonteHtml } = window.Curso;

  definir('curso-tabela', class extends Componente {
    montar() {
      const tabela = this.querySelector('table');
      if (!tabela) return;
      tabela.classList.add('tabela');
      if (this.hasAttribute('listrada')) tabela.classList.add('tabela--listrada');

      const figura = criar('figure', 'tabela-bloco');
      if (this.hasAttribute('titulo')) figura.innerHTML = `<figcaption class="figura__titulo">${esc(this.attr('titulo'))}</figcaption>`;
      const rolagem = criar('div', 'table-responsive', [tabela]);
      rolagem.tabIndex = 0; // permite rolar pelo teclado
      figura.append(rolagem);
      figura.insertAdjacentHTML('beforeend', fonteHtml(this));
      this.replaceChildren(figura);
    }
  });
})();
