/* <curso-etapas>
     <curso-item titulo="Prática sexual anal receptiva"></curso-item>
     <curso-item titulo="Exame físico direcionado"></curso-item>
   </curso-etapas>
   Sequência de passos ligados por setas (vira coluna no celular). */
(function () {
  const { Componente, definir, lerItens, criar } = window.Curso;

  definir('curso-etapas', class extends Componente {
    montar() {
      const lista = criar('ol', 'etapas');
      lerItens(this).forEach(({ titulo, conteudo }) => {
        const item = criar('li', 'etapas__item');
        item.innerHTML = `<span class="etapas__titulo">${titulo}</span>`;
        if (conteudo.some((n) => n.nodeType === 1 || n.textContent.trim())) item.append(criar('div', 'etapas__texto', conteudo));
        lista.append(item);
      });
      this.replaceChildren(lista);
    }
  });
})();
