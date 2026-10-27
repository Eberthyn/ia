/* <curso-circulos>
     <curso-item titulo="Salto técnico"> …texto do modal… </curso-item>
     <curso-item titulo="Salto de acesso"> … </curso-item>
     <curso-item titulo="Salto institucional"> … </curso-item>
   </curso-circulos>
   Três círculos sobrepostos (diagrama de Venn), numerados. Ao clicar num
   círculo, o conteúdo abre num modal com o título do círculo. */
(function () {
  const { Componente, definir, icone, lerItens, criar, criarModal, abrirModal } = window.Curso;

  definir('curso-circulos', class extends Componente {
    montar() {
      const diagrama = criar('div', 'circulos');

      lerItens(this).slice(0, 3).forEach(({ titulo, conteudo }, i) => {
        const janela = criarModal({ titulo, conteudo });
        const botao = criar('button', `circulos__circulo circulos__circulo--${i + 1}`);
        botao.type = 'button';
        botao.setAttribute('aria-haspopup', 'dialog');
        botao.innerHTML = `
          <span class="circulos__numero">${i + 1}</span>
          <span class="circulos__titulo">${titulo}</span>
          ${icone('hand-index-thumb-fill')}`;
        botao.addEventListener('click', () => abrirModal(janela));
        diagrama.append(botao);
      });

      this.replaceChildren(diagrama);
    }
  });
})();
