/* <curso-caixa tipo="pratica|refletir|leitura|sabia|importante" [titulo="..."]> …conteúdo… </curso-caixa>
   Caixa com borda e aba no topo ("Na prática", "Para refletir",
   "Leitura Complementar"…), decorada com os pixels do tema. */
(function () {
  const { Componente, definir, esc, icone, criar } = window.Curso;

  const TIPOS = {
    pratica: { titulo: 'Na prática', icone: 'gear-wide-connected' },
    refletir: { titulo: 'Para refletir', icone: 'cloud' },
    leitura: { titulo: 'Leitura Complementar', icone: 'file-earmark-text' },
    sabia: { titulo: 'Você sabia?', icone: 'question-circle' },
    importante: { titulo: 'Importante', icone: 'exclamation-triangle' },
  };

  definir('curso-caixa', class extends Componente {
    montar() {
      const tipo = TIPOS[this.attr('tipo')] || { titulo: 'Atenção', icone: 'info-circle' };
      const caixa = criar('aside', 'caixa');
      caixa.innerHTML = `
        <div class="caixa__cabecalho">
          <p class="caixa__titulo">${icone(this.attr('icone', tipo.icone))} ${esc(this.attr('titulo', tipo.titulo))}</p>
        </div>`;
      caixa.append(criar('div', 'caixa__corpo', [...this.childNodes]));
      this.replaceChildren(caixa);
    }
  });
})();
