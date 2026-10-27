/* <curso-linha-tempo>
     <curso-item ano="1943" titulo="O neurônio artificial" imagem="img/icones/linha-1943.webp">
       <p>Warren McCulloch …</p>
     </curso-item>
     …
   </curso-linha-tempo>
   Linha do tempo vertical: ícone redondo sobre a linha, ano numa etiqueta
   e o texto alternando à direita e à esquerda (no celular, tudo à direita).
   Para formatar o título (itálico etc.), use <curso-titulo> dentro do item. */
(function () {
  const { Componente, definir, esc, lerItens, criar } = window.Curso;

  definir('curso-linha-tempo', class extends Componente {
    montar() {
      const lista = criar('ol', 'linha-tempo');
      lerItens(this).forEach(({ titulo, conteudo, item }) => {
        const marco = criar('li', 'linha-tempo__item');
        const imagem = item.getAttribute('imagem');
        marco.innerHTML = `
          <div class="linha-tempo__marco">
            <span class="linha-tempo__icone">${imagem ? `<img src="${esc(imagem)}" alt="" loading="lazy">` : ''}</span>
            <span class="linha-tempo__ano">${esc(item.getAttribute('ano') || '')}</span>
          </div>`;
        const texto = criar('div', 'linha-tempo__texto', conteudo);
        if (titulo) texto.insertAdjacentHTML('afterbegin', `<p class="linha-tempo__titulo">${titulo}</p>`);
        marco.append(texto);
        lista.append(marco);
      });
      this.replaceChildren(lista);
    }
  });
})();
