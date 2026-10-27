/* =====================================================================
   CONFIGURAÇÃO DO CURSO
   Único arquivo que descreve a estrutura: título, módulos, aulas e links.
   Menu lateral, trilha (breadcrumb), botões Voltar/Avançar e cards da
   home são gerados a partir daqui.

   - "arquivo" é o caminho a partir da raiz do curso.
   - Página sem "arquivo" aparece no menu como texto (ainda não publicada).
   ===================================================================== */
window.CURSO_CONFIG = {
  // Banner: "Introdução à / INTELIGÊNCIA ARTIFICIAL / aplicada à saúde"
  titulo: {
    chamada: 'Introdução à',
    destaque: ['Inteligência Artificial'],
    complemento: 'aplicada à saúde',
  },

  home: 'index.html',
  rotuloHome: 'Apresentação do curso', // texto do botão "Voltar" na introdução do módulo 1

  // Links extras: ficam no banner da home e no fim do menu lateral.
  // Sem "arquivo", aparecem como texto (página ainda não publicada).
  extras: [
    { rotulo: 'Referências', icone: 'file-earmark-text-fill' },
    { rotulo: 'Créditos', icone: 'list-ul' },
    { rotulo: 'Glossário', icone: 'book-half' },
  ],

  // emBreve: true mostra a etiqueta "Em breve" no card do módulo na home.
  modulos: [
    {
      numero: 1,
      titulo: 'Introdução, Histórico da IA e Grandes Modelos de Linguagem',
      introducao: { arquivo: 'modulo1/introducao.html' },
      aulas: [
        { titulo: 'Vivendo a era da Inteligência Artificial', arquivo: 'modulo1/aula1.html' },
        { titulo: 'Categorias de IA', arquivo: 'modulo1/aula2.html' },
        { titulo: 'LLMs e os principais chatbots', arquivo: 'modulo1/aula3.html' },
        { titulo: 'Chatbots', arquivo: 'modulo1/aula4.html' },
      ],
      resumo: { arquivo: 'modulo1/resumo.html' },
    },
    {
      numero: 2,
      titulo: 'Título a definir',
      emBreve: true,
      introducao: {},
      aulas: [{ titulo: 'Em breve' }, { titulo: 'Em breve' }, { titulo: 'Em breve' }, { titulo: 'Em breve' }],
      resumo: {},
    },
    {
      numero: 3,
      titulo: 'Título a definir',
      emBreve: true,
      introducao: {},
      aulas: [{ titulo: 'Em breve' }, { titulo: 'Em breve' }, { titulo: 'Em breve' }, { titulo: 'Em breve' }],
      resumo: {},
    },
    {
      numero: 4,
      titulo: 'O uso da IA pelo paciente: como lidar na prática clínica',
      emBreve: true,
      introducao: {},
      aulas: [
        { titulo: 'O paciente com a chegada da IA' },
        { titulo: 'Como conduzir a consulta na era da IA' },
        { titulo: 'Como orientar o paciente para um uso seguro da IA' },
      ],
      resumo: {},
    },
  ],
};
