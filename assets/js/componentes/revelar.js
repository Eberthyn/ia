/* <curso-revelar titulo="O que faltou?"> …conteúdo… </curso-revelar>
   Barra escura com seta que mostra/esconde a resposta logo abaixo
   (usada dentro dos cenários: "O que faltou?", "O que o exemplo mostra?"). */
(function () {
  const { Componente, definir, esc, icone, novoId, criar } = window.Curso;

  definir('curso-revelar', class extends Componente {
    montar() {
      const painel = novoId('revelar');
      const bloco = criar('div', 'revelar');
      bloco.innerHTML = `
        <button class="revelar__botao collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#${painel}" aria-expanded="false" aria-controls="${painel}">
          <span>${esc(this.attr('titulo', 'Saiba mais'))}</span>${icone('chevron-down')}
        </button>`;
      const corpo = criar('div', 'collapse', [criar('div', 'revelar__corpo', [...this.childNodes])]);
      corpo.id = painel;
      bloco.append(corpo);
      this.replaceChildren(bloco);
    }
  });
})();
