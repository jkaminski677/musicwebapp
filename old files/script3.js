var pageCanvas = document.getElementById('the-canvas');
var scalePDF = 4;
var pdfViewer = document.querySelector('.canvasDiv');
var thisScale = document.querySelector('.div-canvas-Scale');
var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("demo");
var allPagesButton = document.getElementById('allpages');

output.innerHTML = rangeslider.value;
var scale = 100;


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





// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = 'elements/element1/Wellerman_3st.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'; // The same in local workker2.js
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'JSfiles/workker2.js';


var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = scalePDF,
    canvas = pageCanvas,
    ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  // console.log(pdfDoc);

  pdfDoc.getPage(num).then(function(page) {
    // console.log(pdfDoc);
    // console.log(num);
    // console.log(page);
    var viewport = page.getViewport({scale: scale});
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById('page_num').textContent = num;

  
}

for(let i = 2; i <= 4; i++){
  console.log(i);
  addElement(i);
}

 
function addElement(i) {
  
  // create a new div element
  const newDiv = document.createElement("canvas");
  newDiv.id = 'the-canvas' + i;
  newDiv.className = 'colors';
  thisScale.appendChild(newDiv);
  const currentDiv = document.getElementById('the-canvas' + i);
  currentDiv.style.width = "100%";
  currentDiv.style.margin = "10px 0 10px 0";
  // console.log(newDiv.id);
  // canvas = currentDiv;
  // pageNum = i;
  // pageNumPending = i;
  // renderPage(i);

  // pageRendering = true;
  // // Using promise to fetch the page
  // pdfDoc.getPage(i).then(function(page) {
  //   var viewport = page.getViewport({scale: scale});
  //   canvas.height = viewport.height;
  //   canvas.width = viewport.width;

  //   // Render PDF page into canvas context
  //   var renderContext = {
  //     canvasContext: ctx,
  //     viewport: viewport
  //   };
  //   var renderTask = page.render(renderContext);

  //   // Wait for rendering to finish
  //   renderTask.promise.then(function() {
  //     pageRendering = false;
  //     if (pageNumPending !== null) {
  //       // New page rendering is pending
  //       addElement(pageNumPending);
  //       pageNumPending = null;
  //     }
  //   });
  // });

}


// // Render all pages
// function renderAllPages() {
//   for (var i = 1; i <= 4; i++) {
//       const newDiv = document.createElement("canvas");
//       newDiv.id = 'the-canvas' + i;
//       // newDiv.className = 'colors';
//       thisScale.appendChild(newDiv);
//       const currentDiv = document.getElementById('the-canvas' + i);
//       currentDiv.style.width = "100%";
//       currentDiv.style.margin = "10px 0 10px 0";
//       pageCanvas = currentDiv;

//     pdfDoc.getPage(i).then(function(page) {
//       var viewport = page.getViewport({scale: scale});
//       pageCanvas.height = viewport.height;
//       pageCanvas.width = viewport.width;

//       var renderContext = {
//         canvasContext: ctx,
//         viewport: viewport
//       };
//       var renderTask = page.render(renderContext);

//       renderTask.promise.then(function() {
//         if (i === pdfDoc.numPages) {
//           pageRendering = false;
//           updatePageCounters();
//         }
//       });
//     });
//   }
// }

// // Go to all pages
// allPagesButton.addEventListener('click', function() {
//   pageNum = 1;
//   renderAllPages();
// });



/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Displays previous page.
 */
function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

/**
 * Asynchronously downloads PDF.
 */
pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page_count').textContent = pdfDoc.numPages;
  // Initial/first page rendering
  renderPage(pageNum);

});

