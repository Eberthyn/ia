/* <curso-modal id="modal-imitadora" titulo="..." [imagem="..." alt="..."]>
     …conteúdo…
   </curso-modal>

   Janela que abre ao clicar em qualquer link que aponte para o id:
     <a href="#modal-imitadora">a grande imitadora</a>

   O link pode ficar no meio de um parágrafo; o <curso-modal> fica fora dele
   (ex.: logo depois do parágrafo). Com "imagem", ela aparece à esquerda do texto. */
(function () {
  const { Componente, definir, esc, criarModal, abrirModal } = window.Curso;

  definir('curso-modal', class extends Componente {
    montar() {
      const id = this.id || `modal-${Math.random().toString(36).slice(2, 8)}`;
      this.removeAttribute('id'); // o id passa para a janela

      const janela = criarModal({
        id,
        titulo: esc(this.attr('titulo')),
        conteudo: [...this.childNodes],
        imagem: this.attr('imagem'),
        alt: this.attr('alt'),
      });
      this.remove();

      // Liga os links que apontam para esta janela
      document.querySelectorAll(`a[href="#${id}"]`).forEach((link) => {
        link.classList.add('link-modal');
        link.setAttribute('role', 'button');
        link.setAttribute('aria-haspopup', 'dialog');
        link.addEventListener('click', (evento) => {
          evento.preventDefault();
          abrirModal(janela);
        });
      });
    }
  });
})();
