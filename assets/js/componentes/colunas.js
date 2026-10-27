/* <curso-colunas>
     <curso-item titulo="Cicatriz nos testes treponêmicos"> … </curso-item>
     <curso-item titulo="Cicatriz nos testes não treponêmicos"> … </curso-item>
   </curso-colunas>
   Comparação lado a lado com cabeçalho azul; empilha no celular. */
(function () {
  const { Componente, definir, lerItens, criar } = window.Curso;

  definir('curso-colunas', class extends Componente {
    montar() {
      const grade = criar('div', 'colunas');
      lerItens(this).forEach(({ titulo, conteudo }) => {
        const coluna = criar('section', 'colunas__coluna');
        coluna.innerHTML = `<h4 class="colunas__titulo">${titulo}</h4>`;
        coluna.append(criar('div', 'colunas__corpo', conteudo));
        grade.append(coluna);
      });
      this.replaceChildren(grade);
    }
  });
})();
