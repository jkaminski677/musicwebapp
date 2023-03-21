// URL do pliku PDF
const url = 'elements/element1/Wellerman_3st.pdf';

// Inicjalizacja PDF.js
pdfjsLib.getDocument(url).promise.then(pdf => {
  // Pętla przez wszystkie strony pliku PDF
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    // Utworzenie elementu canvas dla każdej strony
    const canvas = document.createElement('canvas');
    canvas.id = `page-${pageNum}`;
    
    document.getElementById('pdf-container').appendChild(canvas);
    const currentDiv = document.getElementById('page-' + pageNum);
    currentDiv.style.width = "100%";
    currentDiv.style.margin = "10px 0 10px 0";

    // Renderowanie strony PDF na canvasie
    pdf.getPage(pageNum).then(page => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvasContext = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext,
        viewport
      };
      page.render(renderContext);
    });
  }
});