/* =====================================================================
   CARREGADOR
   Única tag <script> que cada página precisa:
     <script src="[caminho]/assets/js/curso.js"></script>
   Descobre a raiz do curso pelo próprio endereço e carrega, em ordem,
   o Bootstrap, a configuração e os componentes.
   Componente novo = arquivo novo em componentes/ + uma linha na lista.
   ===================================================================== */
(function () {
  const raiz = new URL('../../', document.currentScript.src).href;

  window.Curso = { raiz };

  // Favicon: um arquivo só para todas as páginas
  if (!document.querySelector('link[rel="icon"]')) {
    const icone = document.createElement('link');
    icone.rel = 'icon';
    icone.href = raiz + 'assets/img/favicon.ico';
    document.head.appendChild(icone);
  }

  const arquivos = [
    'assets/vendor/bootstrap/bootstrap.bundle.min.js',
    'curso.config.js',
    'assets/js/nucleo.js',
    // estrutura
    'assets/js/componentes/topo.js',
    'assets/js/componentes/banner.js',
    'assets/js/componentes/menu.js',
    'assets/js/componentes/trilha.js',
    'assets/js/componentes/navegacao.js',
    'assets/js/componentes/rodape.js',
    // conteúdo
    'assets/js/componentes/audiodescricao.js',
    'assets/js/componentes/figura.js',
    'assets/js/componentes/destaque.js',
    'assets/js/componentes/video.js',
    'assets/js/componentes/modulos.js',
    'assets/js/componentes/acordeao.js',
    'assets/js/componentes/abas.js',
    'assets/js/componentes/carrossel.js',
    'assets/js/componentes/cartoes.js',
    'assets/js/componentes/caixa.js',
    'assets/js/componentes/nota.js',
    'assets/js/componentes/saiba-mais.js',
    'assets/js/componentes/tabela.js',
    'assets/js/componentes/colunas.js',
    'assets/js/componentes/termo.js',
    'assets/js/componentes/etapas.js',
    'assets/js/componentes/modal.js',
    'assets/js/componentes/fases.js',
    'assets/js/componentes/linha-tempo.js',
    'assets/js/componentes/matriz.js',
    'assets/js/componentes/circulos.js',
    'assets/js/componentes/pontos.js',
    // layout completo (por último: usa os anteriores)
    'assets/js/componentes/pagina.js',
  ];

  arquivos.forEach((arquivo) => {
    const script = document.createElement('script');
    script.src = raiz + arquivo;
    script.async = false; // mantém a ordem de execução
    document.head.appendChild(script);
  });
})();
