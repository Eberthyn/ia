/* <curso-rodape>
   Rodapé com as logos institucionais. */
(function () {
  const { Componente, definir, url } = window.Curso;

  definir('curso-rodape', class extends Componente {
    montar() {
      this.innerHTML = `
        <footer class="rodape">
          <img src="${url('assets/img/logos-rodape.png')}" alt="Campus Virtual Fiocruz, Fiocruz, SUS e Ministério da Saúde">
        </footer>`;
    }
  });
})();
