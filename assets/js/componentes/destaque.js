/* <curso-destaque titulo="Leitura Complementar" icone="file-earmark-text">
     <p>Qualquer conteúdo HTML.</p>
   </curso-destaque>
   Atalho para a mesma caixa de <curso-caixa> com título e ícone livres
   (padrão: "Leitura Complementar"). "icone" é um nome do Bootstrap Icons. */
(function () {
  const { Componente, definir, esc, icone, criar } = window.Curso;

  definir('curso-destaque', class extends Componente {
    montar() {
      const caixa = criar('aside', 'caixa');
      caixa.innerHTML = `
        <div class="caixa__cabecalho">
          <p class="caixa__titulo">${icone(this.attr('icone', 'file-earmark-text'))} ${esc(this.attr('titulo', 'Leitura Complementar'))}</p>
        </div>`;
      caixa.append(criar('div', 'caixa__corpo', [...this.childNodes]));
      this.replaceChildren(caixa);
    }
  });
})();
