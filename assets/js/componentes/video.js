/* <curso-video src="..." titulo="...">
   Vídeo responsivo 16:9. Aceita link de incorporação (YouTube, Vimeo…)
   ou arquivo .mp4/.webm. Sem "src" mostra um espaço reservado. */
(function () {
  const { Componente, definir, esc, icone } = window.Curso;

  definir('curso-video', class extends Componente {
    montar() {
      const src = this.attr('src');
      const titulo = esc(this.attr('titulo', 'Vídeo'));
      let midia = `<div class="video__vazio" role="img" aria-label="Vídeo a definir">${icone('play-fill')}</div>`;

      if (/\.(mp4|webm|ogv)$/i.test(src)) {
        midia = `<video src="${esc(src)}" title="${titulo}" controls preload="metadata"></video>`;
      } else if (src) {
        midia = `<iframe src="${esc(src)}" title="${titulo}" loading="lazy" allowfullscreen
                   allow="accelerometer; encrypted-media; picture-in-picture"></iframe>`;
      }

      this.innerHTML = `<div class="video ratio ratio-16x9">${midia}</div>`;
    }
  });
})();
