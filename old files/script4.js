// intial params
let pdf ;
let canvas;
let isPageRendering;
let pageRenderingQueue = null;
let canvasContext;
let totalPages;
let currentPageNum = 1;
let ilo = 2;
let pages = 0;
let ilosc = 2;

// init when window is loaded
function initPDFRenderer() {
    var url = 'elements/element1/Wellerman_3st.pdf';
    // const url = 'test1.pdf'; // replace with your pdf location

    let option  = {url};

    pdfjsLib.getDocument(option).promise.then(pdfData => {
        totalPages = pdfData.numPages;
        // console.log(totalPages);
        ilosc = totalPages;
        let pagesCounter= document.getElementById('total_page_num');
        pagesCounter.textContent = totalPages;
        ilosc = pagesCounter.textContent;
        // assigning read pdfContent to global variable
        pdf = pdfData;
        renderPage(currentPageNum);
    });
}

for (let i = 1; i<=ilo; i++) {
    if(ilo < 3){
        // console.log(i);
        ilo++;
        // ilosc = pageNumbers();
        // console.log("Dlaczego to robisz");
        // console.log(ilosc);
    }
    console.log("Dlaczego to robisz");
    console.log(ilosc);
} 

// function pageNumbers(pages) {
    
//     return pages;
// }


console.log(ilosc);



// events
window.addEventListener('load', function () {
    isPageRendering= false;
    pageRenderingQueue = null;
    canvas = document.getElementById('pdf_canvas');
    canvasContext = canvas.getContext('2d');
    initEvents();
    initPDFRenderer();
});

function initEvents() {
    let prevPageBtn = document.getElementById('prev_page');
    let nextPageBtn = document.getElementById('next_page');
    let goToPage = document.getElementById('go_to_page');
    prevPageBtn.addEventListener('click', renderPreviousPage);
    nextPageBtn.addEventListener('click',renderNextPage);
    goToPage.addEventListener('click', goToPageNum);
}



function renderPage(pageNumToRender = 1, scale = 1) {
    isPageRendering = true;
    document.getElementById('current_page_num').textContent = pageNumToRender;
    pdf.getPage(pageNumToRender).then(page => {
        document.getElementById("loader").style.display = "none";
        const viewport = page.getViewport({scale:1});
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let renderCtx = {canvasContext ,viewport};
        page.render(renderCtx).promise.then(()=> {
            isPageRendering = false;
            if(pageRenderingQueue !== null) { // this is to check of there is next page to be rendered in the queue
                renderPage(pageNumToRender);
                pageRenderingQueue = null; 
            }
        });        
    }); 
}

function renderPageQueue(pageNum) {
    if(pageRenderingQueue != null) {
        pageRenderingQueue = pageNum;
    } else {
        renderPage(pageNum);
    }
}

function renderNextPage(ev) {
    if(currentPageNum >= totalPages) {
        // alert("This is the last page");
        return ;
    }
    currentPageNum++;
    renderPageQueue(currentPageNum);
}

function renderPreviousPage(ev) {
    if(currentPageNum<=1) {
        // alert("This is the first page");
        return ;
    }
    currentPageNum--;
    renderPageQueue(currentPageNum);
}

function goToPageNum(ev) {
    let numberInput = document.getElementById('page_num');
    let pageNumber = parseInt(numberInput.value);
    if(pageNumber) {
        if(pageNumber <= totalPages && pageNumber >= 1){
            currentPageNum = pageNumber;
            numberInput.value ="";
            renderPageQueue(pageNumber);
            return ;
        }
    }
        alert("Enter a valide page numer");
}


