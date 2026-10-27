/* <curso-termo titulo="Janela Imunológica">
     janela imunológica
     <curso-definicao>É o intervalo … <i>Treponema pallidum</i> …</curso-definicao>
   </curso-termo>

   Termo destacado que mostra a definição ao passar o mouse, ao focar com o
   teclado ou ao tocar (celular).
   - titulo: aparece em negrito no topo da caixa (opcional).
   - <curso-definicao>: texto da caixa; aceita <i>, <strong>, <em>.
     Use só elementos de texto: o termo fica dentro de um <p>.
   - <template>: use no lugar de <curso-definicao> quando a definição tiver
     parágrafos ou listas (<p>, <ul>, <ol>). O <template> pode ficar dentro
     do <p> sem quebrá-lo.
   - definicao="...": alternativa em texto puro, sem formatação. */
(function () {
  const { Componente, definir, esc } = window.Curso;

  definir(
    "curso-termo",
    class extends Componente {
      montar() {
        const definicaoEl = this.querySelector(
          ":scope > template, :scope > curso-definicao",
        );
        const definicao = definicaoEl
          ? definicaoEl.innerHTML.trim()
          : esc(this.attr("definicao"));
        if (definicaoEl) definicaoEl.remove();

        const titulo = this.attr("titulo");
        const conteudo =
          (titulo
            ? `<strong class="termo__titulo">${esc(titulo)}</strong>`
            : "") + definicao;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "termo";
        botao.append(...this.childNodes);
        this.replaceChildren(botao);

        new bootstrap.Popover(botao, {
          content: conteudo,
          html: true, // o Bootstrap filtra o HTML e mantém só tags seguras (i, strong, em…)
          trigger: "hover focus",
          placement: "top",
          customClass: "termo__definicao",
        });
      }
    },
  );
})();
