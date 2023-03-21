var scale = 100;
var scalePDF = 4;
var pageCanvas = document.getElementById('the-canvas');
var pdfViewer = document.querySelector('.canvasDiv');
var thisScale = document.querySelector('.div-canvas-Scale');
var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
var allPagesButton = document.getElementById('allpages');

output.innerHTML = rangeslider.value;

const url = 'elements/element1/Wellerman_3st.pdf';

// Inicjalizacja PDF.js
pdfjsLib.getDocument(url).promise.then(pdf => {
  // Pętla przez wszystkie strony pliku PDF
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    // Utworzenie elementu canvas dla każdej strony
    const canvas = document.createElement('canvas');
    canvas.id = `page-${pageNum}`;
    
    document.getElementById('Div-canvas-Scale').appendChild(canvas);
    const currentDiv = document.getElementById('page-' + pageNum);
    currentDiv.style.width = "100%";
    currentDiv.style.margin = "10px 0 10px 0";

    // Renderowanie strony PDF na canvasie
    pdf.getPage(pageNum).then(page => {
      const viewport = page.getViewport({ scale: scalePDF });
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

//////////////////// ZOOMING ////////////////////////////
rangeslider.oninput = function() {
  output.innerHTML = this.value;
  thisScale.style.width = this.value + "%";
  // console.log(rangeslider.value);
  scale = this.value * 1;
  if (rangeslider.value > 100) {
    pdfViewer.style.alignItems = 'flex-start';
  }
  else {
    pdfViewer.style.alignItems = 'center';
  }
}


function zoom(event) {
  // rangeslider.value = (scale/4).toFixed(0)
  if(event.ctrlKey == true){
    event.preventDefault();
    scale += event.deltaY * -0.1;

    // Restrict scale
    scale = Math.min(Math.max(10, scale), 400);

    // Apply scale transform
    // pageCanvas.style.transform = `scale(${scale})`;
    thisScale.style.width = scale + "%";
    rangeslider.value = (scale).toFixed(0);
    output.innerHTML = (scale).toFixed(0);
    // console.log(rangeslider.value);
    if (scale > 100) {
      pdfViewer.style.alignItems = 'flex-start';
    }
    else {
      pdfViewer.style.alignItems = 'center';
    }
  }
  
}

pdfViewer.onwheel = zoom;
//////////////////// END ZOOMING ////////////////////////////