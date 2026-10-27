/* <curso-matriz colunas="Humanamente|Racionalmente" linhas="Pensar|Agir">
     <curso-item titulo="Modelar a cognição humana" modal-titulo="Pensar humanamente"> …texto do modal… </curso-item>
     <curso-item titulo="Seguir as leis do raciocínio" modal-titulo="Pensar racionalmente"> … </curso-item>
     …
   </curso-matriz>
   Matriz 2×2 (ou maior) com rótulos nas linhas e colunas. Os itens entram
   linha a linha; ao clicar num quadrante, o conteúdo abre num modal.
   "modal-titulo" é o título da janela (padrão: o título do quadrante). */
(function () {
  const { Componente, definir, esc, icone, lerItens, criar, criarModal, abrirModal } = window.Curso;

  definir('curso-matriz', class extends Componente {
    montar() {
      const colunas = this.attr('colunas').split('|');
      const linhas = this.attr('linhas').split('|');
      const itens = lerItens(this);

      const grade = criar('div', 'matriz');
      grade.style.setProperty('--colunas', colunas.length);
      grade.innerHTML = `<span></span>${colunas.map((c) => `<span class="matriz__rotulo">${esc(c)}</span>`).join('')}`;

      linhas.forEach((linha, l) => {
        grade.insertAdjacentHTML('beforeend', `<span class="matriz__rotulo matriz__rotulo--linha">${esc(linha)}</span>`);
        colunas.forEach((_, c) => {
          const dados = itens[l * colunas.length + c];
          if (!dados) return;
          const modalTitulo = dados.item.getAttribute('modal-titulo');
          const janela = criarModal({ titulo: modalTitulo ? esc(modalTitulo) : dados.titulo, conteudo: dados.conteudo });

          const botao = criar('button', 'matriz__celula');
          botao.type = 'button';
          botao.setAttribute('aria-haspopup', 'dialog');
          botao.innerHTML = `<span>${dados.titulo}</span>${icone('hand-index-thumb-fill')}`;
          botao.addEventListener('click', () => abrirModal(janela));
          grade.append(botao);
        });
      });

      this.replaceChildren(grade);
    }
  });
})();
