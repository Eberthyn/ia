/* <curso-pontos src="img/tela.jpg" alt="..." titulo="..." fonte="...">
     <curso-item x="70" y="4.8" largura="24.8" altura="5.6" titulo="Algoritmo"> … </curso-item>
     …
   </curso-pontos>
   Imagem com áreas clicáveis (medidas em % da imagem). Ao clicar, ao passar
   o mouse ou focar com o teclado, a explicação aparece num balão.
   - Só x e y: marcador numerado centrado no ponto (os números seguem a ordem dos itens).
   - Com largura e altura: região retangular invisível sobre a própria arte
     (ex.: um rótulo do infográfico), sem número; x e y são o canto superior esquerdo. */
(function () {
  const { Componente, definir, esc, lerItens, criar, fonteHtml } = window.Curso;

  definir('curso-pontos', class extends Componente {
    montar() {
      const itens = lerItens(this);
      const audiodescricao = this.querySelector(':scope > curso-audiodescricao');
      const figura = criar('figure', `pontos ${this.hasAttribute('larga') ? 'pontos--larga' : ''}`);
      const titulo = this.attr('titulo');
      figura.innerHTML = `
        ${titulo ? `<figcaption class="figura__titulo">${esc(titulo)}</figcaption>` : ''}
        <div class="pontos__area">
          <img class="pontos__imagem" src="${esc(this.attr('src'))}" alt="${esc(this.attr('alt'))}" loading="lazy">
        </div>
        ${fonteHtml(this)}`;
      const area = figura.querySelector('.pontos__area');

      itens.forEach(({ titulo: nome, conteudo, item }, i) => {
        const regiao = item.hasAttribute('largura') && item.hasAttribute('altura');
        const rotulo = regiao ? nome : `${i + 1}. ${nome}`;
        const botao = criar('button', regiao ? 'pontos__regiao' : 'pontos__marcador');
        botao.type = 'button';
        botao.style.left = `${item.getAttribute('x')}%`;
        botao.style.top = `${item.getAttribute('y')}%`;
        if (regiao) {
          botao.style.width = `${item.getAttribute('largura')}%`;
          botao.style.height = `${item.getAttribute('altura')}%`;
        } else {
          botao.textContent = i + 1;
        }
        botao.setAttribute('aria-label', rotulo.replace(/<[^>]+>/g, ''));
        area.append(botao);

        // Com conteúdo: título no topo do balão e texto embaixo.
        // Sem conteúdo: o balão mostra só o título.
        const corpo = criar('div', '', conteudo);
        const temCorpo = corpo.textContent.trim() !== '';
        new bootstrap.Popover(botao, {
          title: temCorpo ? rotulo : '',
          content: temCorpo ? corpo.innerHTML : rotulo,
          html: true,
          trigger: 'hover focus',
          placement: 'auto',
          customClass: 'termo__definicao',
        });
      });

      if (audiodescricao) figura.append(audiodescricao);
      this.replaceChildren(figura);    }
  });
})();
