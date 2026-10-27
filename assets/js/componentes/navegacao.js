/* <curso-navegacao>
   Botões Voltar/Avançar calculados pela ordem das páginas no config.
   Na home mostra apenas "Começar". */
(function () {
  const { Componente, definir, esc, icone, paginas, home, atual, anterior, proxima } = window.Curso;

  const botao = (pagina, classe, conteudo) =>
    pagina.url
      ? `<a class="btn ${classe}" href="${pagina.url}">${conteudo}</a>`
      : `<span class="btn ${classe} disabled" aria-disabled="true" title="Página ainda não disponível">${conteudo}</span>`;

  definir('curso-navegacao', class extends Componente {
    montar() {
      let botoes = '';

      if (atual === home) {
        const primeira = paginas.find((p) => p !== home && p.url);
        if (primeira) botoes = botao(primeira, 'btn-avancar', `Começar ${icone('chevron-right')}`);
      } else {
        if (anterior) botoes += botao(anterior, 'btn-voltar', `${icone('chevron-left')} ${esc(anterior.rotuloNav)}`);
        if (proxima) botoes += botao(proxima, 'btn-avancar', `${esc(proxima.rotuloNav)} ${icone('chevron-right')}`);
      }

      this.innerHTML = botoes ? `<nav class="navegacao" aria-label="Navegação entre páginas">${botoes}</nav>` : '';
    }
  });
})();
