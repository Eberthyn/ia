/* <curso-pagina [tema="capa|aula"]>
     ...conteúdo da página...
   </curso-pagina>
   Layout completo das páginas internas: banner, menu, trilha, conteúdo,
   Voltar/Avançar e rodapé. Descobre sozinho qual página é (pelo endereço)
   e em qual módulo está.
   tema: "capa" (fundo azul; padrão nas introduções e resumos) ou "aula" (fundo branco). */
(function () {
  const { Componente, definir, atual, config } = window.Curso;

  definir('curso-pagina', class extends Componente {
    montar() {
      const conteudo = [...this.childNodes];
      const modulo = atual && atual.modulo ? atual.modulo.numero : '';
      const aula = atual && atual.tipo === 'aula' ? atual.numero : '';
      const tema = this.attr('tema', atual && ['intro', 'resumo'].includes(atual.tipo) ? 'capa' : 'aula');

      this.dataset.tema = tema;
      this.innerHTML = `
        <a class="visually-hidden-focusable pular" href="#conteudo">Pular para o conteúdo</a>
        <curso-topo></curso-topo>
        <curso-banner modulo="${modulo}" aula="${aula}"></curso-banner>
        <div class="pagina">
          <curso-menu></curso-menu>
          <main class="pagina__principal" id="conteudo" tabindex="-1">
            <div class="faixa faixa--topo" aria-hidden="true"></div>
            <div class="conteudo">
              <curso-trilha></curso-trilha>
              <div class="conteudo__miolo"></div>
              <curso-navegacao></curso-navegacao>
            </div>
            <div class="faixa faixa--base" aria-hidden="true"></div>
          </main>
        </div>
        <curso-rodape></curso-rodape>`;

      this.querySelector('.conteudo__miolo').append(...conteudo);

      if (!document.title && atual) {
        const { chamada, destaque, complemento = '' } = config.titulo;
        document.title = `${atual.rotuloNav || atual.rotulo} — ${chamada} ${destaque.join(' ')} ${complemento}`.trim();
      }
      this.setAttribute('pronto', '');
    }
  });
})();
