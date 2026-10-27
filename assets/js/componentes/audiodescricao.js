/* <curso-audiodescricao>
     <p>Texto da audiodescrição…</p>
   </curso-audiodescricao>
   Descrição detalhada de uma imagem ou diagrama, lida apenas por leitores de
   tela (NVDA, JAWS, VoiceOver, Narrador, TalkBack, ChromeVox…). Não aparece
   na tela e não tem botão. Dentro de <curso-figura>, fica junto da imagem;
   fora dela (ex.: depois de <curso-etapas>), fica onde estiver.
   O "alt" da imagem continua curto; a descrição longa fica aqui.
   O CSS já esconde o elemento antes do JS carregar (componentes.css). */
(function () {
  const { Componente, definir } = window.Curso;

  definir('curso-audiodescricao', class extends Componente {
    montar() {
      // Rótulo falado antes do texto, para a pessoa saber o que está ouvindo
      this.insertAdjacentHTML('afterbegin', '<p>Audiodescrição:</p>');
    }
  });
})();
