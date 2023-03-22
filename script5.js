var scale = 100;
var scalePDF = 4;
var pageCanvas = document.getElementById('the-canvas');
var pdfViewer = document.querySelector('.canvasDiv');
var thisScale = document.querySelector('.div-canvas-Scale');
var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
var stopVar = 0;
var maxi = 0;
var distance = 0;
document.getElementById('page_num').textContent = 1;
output.innerHTML = rangeslider.value + "%";

const url = 'elements/element1/Wellerman_3st.pdf';

// Inicjalizacja PDF.js
pdfjsLib.getDocument(url).promise.then(pdf => {
  // Pętla przez wszystkie strony pliku PDF
  for (let selees = -2; selees <= 0; selees++){
    const sele = document.createElement('div');
    sele.id = `sel-${selees}`;
    document.getElementById('Div-canvas-Scale').appendChild(sele);
    const seleDiv = document.getElementById('sel-' + selees);
    seleDiv.style.width = "100%";
    seleDiv.style.height = "1px";
    // seleDiv.style.border = "2px solid peru";
  }

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    // Utworzenie elementu canvas dla każdej strony
    const sele = document.createElement('div');
    sele.id = `sel-${pageNum}`;
    document.getElementById('Div-canvas-Scale').appendChild(sele);
    const seleDiv = document.getElementById('sel-' + pageNum);
    seleDiv.style.width = "100%";
    seleDiv.style.height = "1px";
    // seleDiv.style.border = "2px solid peru";

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

    pdfViewer.addEventListener('scroll', function() {
      var element = document.querySelector('#page-' + pageNum);
      var position = element.getBoundingClientRect();    

      if(position.top < window.innerHeight && position.bottom >= 0) {
        if (pageNum != stopVar) {
            document.getElementById('page_num').textContent = pageNum;
            changePage(pageNum, pdf.numPages);
        }
        stopVar = pageNum;
      }
    });

    document.getElementById('page_count').textContent = pdf.numPages;
  }

  for (let selees = pdf.numPages+1; selees <= pdf.numPages+3; selees++){
    const sele = document.createElement('div');
    sele.id = `sel-${selees}`;
    document.getElementById('Div-canvas-Scale').appendChild(sele);
    const seleDiv = document.getElementById('sel-' + selees);
    seleDiv.style.width = "100%";
    seleDiv.style.height = "1px";
    // seleDiv.style.border = "2px solid peru";
  }
});



function changePage(numero, maxi) {
  function onNextPage() {
    if (numero < maxi) {
      numero++;
      var leme = document.querySelector('#sel-' + numero);
      leme.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  }
  document.getElementById('next').addEventListener('click', onNextPage);
  
  function onPrevPage() {
    if(numero > 1){
      numero--;
      var leme = document.querySelector('#sel-' + numero);
      leme.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  }
  document.getElementById('prev').addEventListener('click', onPrevPage);
    
}



//////////////////// ZOOMING ////////////////////////////
rangeslider.oninput = function() {
  output.innerHTML = this.value + "%";
  thisScale.style.width = this.value + "%";
  // console.log(rangeslider.value);
  scale = this.value * 1;
  distance = this.value * 1;
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
    output.innerHTML = (scale).toFixed(0) + "%";
    distance = scale;
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


// Dodajemy nasłuchiwanie na zdarzenie dotknięcia i przesuwania dwóch palców
pdfViewer.addEventListener('touchmove', function(event) {
  // Sprawdzamy, czy na ekranie jest więcej niż jeden palec
  if (event.touches.length > 1) {
    // Obliczamy odległość między palcami
    distance = Math.hypot(
      event.touches[0].clientX - event.touches[1].clientX,
      event.touches[0].clientY - event.touches[1].clientY
    );
    // Ustawiamy właściwość transform z wartością scale opartą o odległość między palcami
    thisScale.style.width = distance + "%";
    rangeslider.value = (distance).toFixed(0);
    output.innerHTML = (distance).toFixed(0) + "%";
    scale = distance * 1;
  }
  console.log(distance);
});


function resetPageSize() {
  thisScale.style.width = "100%";
  rangeslider.value = 100;
  output.innerHTML = "100%";
  scale = 100;
}
// document.querySelector('#resetScale').addEventListener('click', resetPageSize());


var button = document.getElementById("resetScale");
button.title = "To jest przycisk";

//////////////////// END ZOOMING ////////////////////////////



// Download PDF
var downloadPDF = document.querySelector('#downloadPDF');
downloadPDF.href = 'elements/element1/Wellerman_3st.pdf'