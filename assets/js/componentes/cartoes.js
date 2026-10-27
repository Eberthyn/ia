/* <curso-cartoes>
     <curso-item titulo="Roséolas"> …verso do cartão… </curso-item>
   </curso-cartoes>
   Cartões que viram ao clicar: frente com o título, verso com o conteúdo.
   "claro": cartão branco com borda (ex.: um único cartão de pergunta). */
(function () {
  const { Componente, definir, icone, lerItens, criar } = window.Curso;

  definir(
    "curso-cartoes",
    class extends Componente {
      montar() {
        const grade = criar("div", `cartoes ${this.hasAttribute("claro") ? "cartoes--claro" : ""}`);

        lerItens(this).forEach(({ titulo, conteudo }) => {
          const cartao = criar("button", "cartao");
          cartao.type = "button";
          cartao.setAttribute("aria-pressed", "false");
          cartao.innerHTML = `
          <span class="cartao__face cartao__frente">
            <span class="cartao__titulo">${titulo}</span>
            ${icone("hand-index-thumb-fill")}
            <span class="visually-hidden">(clique para ver a explicação)</span>
          </span>`;
          const verso = criar("span", "cartao__face cartao__verso", [
            criar("span", "cartao__texto", conteudo),
          ]);
          verso.insertAdjacentHTML("beforeend", icone("hand-index-thumb-fill"));
          cartao.append(verso);
          cartao.addEventListener("click", () => {
            const virado = cartao.classList.toggle("cartao--virado");
            cartao.setAttribute("aria-pressed", String(virado));
          });
          grade.append(cartao);
        });

        this.replaceChildren(grade);
      }
    },
  );
})();
