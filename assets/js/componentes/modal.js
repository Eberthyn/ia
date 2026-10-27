/* <curso-modal id="modal-imitadora" titulo="..." [imagem="..." alt="..."]>
     …conteúdo…
   </curso-modal>

   Janela que abre ao clicar em qualquer link que aponte para o id:
     <a href="#modal-imitadora">a grande imitadora</a>

   O link pode ficar no meio de um parágrafo; o <curso-modal> fica fora dele
   (ex.: logo depois do parágrafo). Com "imagem", ela aparece à esquerda do texto. */
(function () {
  const { Componente, definir, esc, criar } = window.Curso;

  definir('curso-modal', class extends Componente {
    montar() {
      const id = this.id || `modal-${Math.random().toString(36).slice(2, 8)}`;
      this.removeAttribute('id'); // o id passa para a janela
      const tituloId = `${id}-titulo`;
      const imagem = this.attr('imagem');

      const corpo = criar('div', 'modal-curso__texto', [...this.childNodes]);
      corpo.insertAdjacentHTML('afterbegin', `<h2 class="modal-curso__titulo" id="${tituloId}">${esc(this.attr('titulo'))}</h2>`);

      const janela = criar('div', 'modal fade modal-curso');
      Object.assign(janela, { id, tabIndex: -1 });
      janela.setAttribute('aria-labelledby', tituloId);
      janela.setAttribute('aria-hidden', 'true');
      janela.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ${imagem ? 'modal-lg' : ''}">
          <div class="modal-content">
            <button type="button" class="btn-close modal-curso__fechar" data-bs-dismiss="modal" aria-label="Fechar"></button>
            <div class="modal-body modal-curso__corpo ${imagem ? 'modal-curso__corpo--imagem' : ''}">
              ${imagem ? `<img class="modal-curso__imagem" src="${esc(imagem)}" alt="${esc(this.attr('alt'))}">` : ''}
            </div>
          </div>
        </div>`;
      janela.querySelector('.modal-body').append(corpo);

      // Fica no <body> para não ser afetado pelo layout da página
      document.body.append(janela);
      this.remove();

      // Liga os links que apontam para esta janela
      document.querySelectorAll(`a[href="#${id}"]`).forEach((link) => {
        link.classList.add('link-modal');
        link.setAttribute('role', 'button');
        link.setAttribute('aria-haspopup', 'dialog');
        link.addEventListener('click', (evento) => {
          evento.preventDefault();
          bootstrap.Modal.getOrCreateInstance(janela).show();
        });
      });
    }
  });
})();
