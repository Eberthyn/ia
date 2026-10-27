/* <curso-matriz colunas="Humanamente|Racionalmente" linhas="Pensar|Agir">
     <curso-item titulo="Modelar a cognição humana"> …explicação… </curso-item>
     <curso-item titulo="Seguir as leis do raciocínio"> … </curso-item>
     <curso-item titulo="Imitar o comportamento humano"> … </curso-item>
     <curso-item titulo="Atuar como um agente racional"> … </curso-item>
   </curso-matriz>
   Matriz 2×2 (ou maior) com rótulos nas linhas e colunas. Os itens entram
   linha a linha; ao clicar num quadrante, a explicação aparece abaixo. */
(function () {
  const { Componente, definir, esc, icone, novoId, lerItens, criar } = window.Curso;

  definir('curso-matriz', class extends Componente {
    montar() {
      const colunas = this.attr('colunas').split('|');
      const linhas = this.attr('linhas').split('|');
      const itens = lerItens(this);
      const painel = novoId('matriz-painel');

      const grade = criar('div', 'matriz');
      grade.style.setProperty('--colunas', colunas.length);
      grade.innerHTML = `<span></span>${colunas.map((c) => `<span class="matriz__rotulo">${esc(c)}</span>`).join('')}`;

      const saida = criar('div', 'matriz__painel');
      saida.id = painel;
      saida.setAttribute('aria-live', 'polite');
      saida.hidden = true;

      linhas.forEach((linha, l) => {
        grade.insertAdjacentHTML('beforeend', `<span class="matriz__rotulo matriz__rotulo--linha">${esc(linha)}</span>`);
        colunas.forEach((_, c) => {
          const dados = itens[l * colunas.length + c];
          if (!dados) return;
          const botao = criar('button', 'matriz__celula');
          botao.type = 'button';
          botao.setAttribute('aria-expanded', 'false');
          botao.setAttribute('aria-controls', painel);
          botao.innerHTML = `<span>${dados.titulo}</span>${icone('hand-index-thumb-fill')}`;
          botao.addEventListener('click', () => {
            const aberto = botao.getAttribute('aria-expanded') === 'true';
            grade.querySelectorAll('.matriz__celula').forEach((b) => b.setAttribute('aria-expanded', 'false'));
            saida.hidden = aberto;
            if (aberto) return;
            botao.setAttribute('aria-expanded', 'true');
            saida.replaceChildren(criar('p', 'matriz__painel-titulo', []), ...dados.conteudo.map((n) => n.cloneNode(true)));
            saida.firstChild.innerHTML = dados.titulo;
          });
          grade.append(botao);
        });
      });

      this.replaceChildren(grade, saida);
    }
  });
})();
