/* <curso-fases fonte="..." [fonte-link="..."]>
     <curso-item titulo="Período de incubação" imagem="img/a2-fase1.webp">
       <ul> <li>…</li> </ul>
     </curso-item>
     …
   </curso-fases>
   Linha do tempo vertical: imagem redonda à esquerda (já com o número),
   ligada à próxima por um traço colorido, e o texto à direita.
   As cores do traço seguem a ordem: verde-água, laranja, vermelho, verde. */
(function () {
  const { Componente, definir, esc, lerItens, criar, fonteHtml } = window.Curso;

  definir('curso-fases', class extends Componente {
    montar() {
      const lista = criar('ol', 'fases');
      lerItens(this).forEach(({ titulo, conteudo, item }) => {
        const fase = criar('li', 'fases__item');
        const imagem = item.getAttribute('imagem');
        fase.innerHTML = imagem
          ? `<img class="fases__imagem" src="${esc(imagem)}" alt="" loading="lazy">`
          : '<span class="fases__imagem" aria-hidden="true"></span>';
        const texto = criar('div', 'fases__texto', conteudo);
        texto.insertAdjacentHTML('afterbegin', `<p class="fases__titulo">${titulo}</p>`);
        fase.append(texto);
        lista.append(fase);
      });
      const bloco = criar('figure', 'fases-bloco', [lista]);
      bloco.insertAdjacentHTML('beforeend', fonteHtml(this));
      this.replaceChildren(bloco);
    }
  });
})();
