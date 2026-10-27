/* <curso-circulos>
     <curso-item titulo="Salto técnico"> …explicação… </curso-item>
     <curso-item titulo="Salto de acesso"> … </curso-item>
     <curso-item titulo="Salto institucional"> … </curso-item>
   </curso-circulos>
   Três círculos sobrepostos (diagrama de Venn), numerados. Ao clicar num
   círculo, a explicação aparece abaixo do diagrama. */
(function () {
  const { Componente, definir, icone, novoId, lerItens, criar } = window.Curso;

  definir('curso-circulos', class extends Componente {
    montar() {
      const itens = lerItens(this).slice(0, 3);
      const painel = novoId('circulos-painel');
      const diagrama = criar('div', 'circulos');
      const saida = criar('div', 'circulos__painel');
      saida.id = painel;
      saida.setAttribute('aria-live', 'polite');
      saida.hidden = true;

      itens.forEach(({ titulo, conteudo }, i) => {
        const botao = criar('button', `circulos__circulo circulos__circulo--${i + 1}`);
        botao.type = 'button';
        botao.setAttribute('aria-expanded', 'false');
        botao.setAttribute('aria-controls', painel);
        botao.innerHTML = `
          <span class="circulos__numero">${i + 1}</span>
          <span class="circulos__titulo">${titulo}</span>
          ${icone('hand-index-thumb-fill')}`;
        botao.addEventListener('click', () => {
          const aberto = botao.getAttribute('aria-expanded') === 'true';
          diagrama.querySelectorAll('button').forEach((b) => b.setAttribute('aria-expanded', 'false'));
          saida.hidden = aberto;
          if (aberto) return;
          botao.setAttribute('aria-expanded', 'true');
          const cabecalho = criar('p', 'circulos__painel-titulo');
          cabecalho.innerHTML = `${i + 1}. ${titulo}`;
          saida.replaceChildren(cabecalho, ...conteudo.map((n) => n.cloneNode(true)));
        });
        diagrama.append(botao);
      });

      this.replaceChildren(diagrama, saida);
    }
  });
})();
