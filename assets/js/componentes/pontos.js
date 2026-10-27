/* <curso-pontos src="img/tela.jpg" alt="..." titulo="..." fonte="...">
     <curso-item x="30.8" y="70.4" titulo="Campo de mensagem"> …explicação… </curso-item>
     …
   </curso-pontos>
   Imagem com marcadores numerados (x e y em % da imagem). Ao clicar, ao
   passar o mouse ou focar com o teclado, a explicação aparece num balão.
   Os números seguem a ordem dos itens. */
(function () {
  const { Componente, definir, esc, lerItens, criar, fonteHtml } = window.Curso;

  definir('curso-pontos', class extends Componente {
    montar() {
      const itens = lerItens(this);
      const figura = criar('figure', 'pontos');
      const titulo = this.attr('titulo');
      figura.innerHTML = `
        ${titulo ? `<figcaption class="figura__titulo">${esc(titulo)}</figcaption>` : ''}
        <div class="pontos__area">
          <img class="pontos__imagem" src="${esc(this.attr('src'))}" alt="${esc(this.attr('alt'))}" loading="lazy">
        </div>
        ${fonteHtml(this)}`;
      const area = figura.querySelector('.pontos__area');

      itens.forEach(({ titulo: nome, conteudo, item }, i) => {
        const botao = criar('button', 'pontos__marcador');
        botao.type = 'button';
        botao.textContent = i + 1;
        botao.style.left = `${item.getAttribute('x')}%`;
        botao.style.top = `${item.getAttribute('y')}%`;
        botao.setAttribute('aria-label', `${i + 1}: ${nome.replace(/<[^>]+>/g, '')}`);
        area.append(botao);

        const corpo = criar('div', '', conteudo);
        new bootstrap.Popover(botao, {
          title: `${i + 1}. ${nome}`,
          content: corpo.innerHTML,
          html: true,
          trigger: 'hover focus',
          placement: 'auto',
          customClass: 'termo__definicao',
        });
      });

      this.replaceChildren(figura);
    }
  });
})();
