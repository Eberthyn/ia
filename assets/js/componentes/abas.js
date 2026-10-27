/* <curso-abas>
     <curso-item titulo="Sífilis recente"> …conteúdo… </curso-item>
     <curso-item titulo="Sífilis tardia"> …conteúdo… </curso-item>
   </curso-abas>
   Conteúdo em abas. A primeira começa ativa. */
(function () {
  const { Componente, definir, novoId, lerItens, criar } = window.Curso;

  definir('curso-abas', class extends Componente {
    montar() {
      const itens = lerItens(this).map((dados) => ({ ...dados, aba: novoId('aba'), painel: novoId('painel') }));

      const lista = criar('div', 'abas__lista nav');
      lista.setAttribute('role', 'tablist');
      lista.innerHTML = itens.map(({ titulo, aba, painel }, i) => `
        <button class="abas__aba nav-link ${i === 0 ? 'active' : ''}" id="${aba}" type="button" role="tab"
          data-bs-toggle="tab" data-bs-target="#${painel}" aria-controls="${painel}" aria-selected="${i === 0}">${titulo}</button>`).join('');

      const paineis = criar('div', 'abas__paineis tab-content');
      itens.forEach(({ conteudo, aba, painel }, i) => {
        const p = criar('div', `tab-pane fade ${i === 0 ? 'show active' : ''}`, conteudo);
        Object.assign(p, { id: painel, tabIndex: 0 });
        p.setAttribute('role', 'tabpanel');
        p.setAttribute('aria-labelledby', aba);
        paineis.append(p);
      });

      this.replaceChildren(criar('div', 'abas', [lista, paineis]));
    }
  });
})();
