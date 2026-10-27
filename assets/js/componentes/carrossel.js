/* <curso-carrossel>
     <curso-item titulo="Neurossífilis precoce"> …conteúdo… </curso-item>
     <curso-item titulo="Neurossífilis tardia"> …conteúdo… </curso-item>
   </curso-carrossel>
   Slides com setas laterais (sem troca automática). O conteúdo de cada
   item pode ter texto, listas e <curso-figura>.
   "centralizado" centraliza o texto dos slides (slides curtos, só de texto). */
(function () {
  const { Componente, definir, icone, novoId, lerItens, criar } = window.Curso;

  definir('curso-carrossel', class extends Componente {
    montar() {
      const id = novoId('carrossel');
      const itens = lerItens(this);

      const slides = itens.map(({ titulo, conteudo }, i) => {
        const slide = criar('div', `carousel-item ${i === 0 ? 'active' : ''}`);
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-label', `${i + 1} de ${itens.length}`);
        if (titulo) slide.append(Object.assign(criar('p', 'carrossel__titulo'), { innerHTML: titulo }));
        slide.append(...conteudo);
        return slide;
      });

      const seta = (direcao, rotulo, nomeIcone) => `
        <button class="carrossel__seta carrossel__seta--${direcao}" type="button" data-bs-target="#${id}"
          data-bs-slide="${direcao === 'esq' ? 'prev' : 'next'}" aria-label="${rotulo}">${icone(nomeIcone)}</button>`;

      const carrossel = criar('div', `carrossel carousel slide ${this.hasAttribute('centralizado') ? 'carrossel--centralizado' : ''}`);
      carrossel.id = id;
      carrossel.setAttribute('aria-roledescription', 'carrossel');
      carrossel.append(criar('div', 'carousel-inner', slides));
      if (itens.length > 1) {
        carrossel.insertAdjacentHTML('beforeend',
          seta('esq', 'Slide anterior', 'chevron-left') + seta('dir', 'Próximo slide', 'chevron-right'));
      }

      this.replaceChildren(carrossel);
    }
  });
})();
