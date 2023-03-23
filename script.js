const popup = document.querySelector(".popup"),
form = document.querySelector(".uploadform"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");
const png = ['png', 'jpeg', 'jpg', 'gif', 'tiff', 'psd', 'pdf', 'esp', 'ai', 'jfif', 'raw'];
const video = ['mp4', 'webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'drc', 'gif', 'gifv', 'mng', 'avi', 'mov', 'gt', 'wmv', 'asf', ];
const audioFormat = ['3gp', 'aa', 'aac', 'aax', 'act', 'dvf', 'm4a', 'm4b', 'm4p', 'mp3', 'mpc', 'wav', 'wma', 'wv', 'webm', '8svx'];
const pdf = ['pdf', 'txt']

// check ip addres
// fetch('https://api.ipify.org/').then(
//     r => r.text()
// ).then(console.log);

//cie - 46.204.12.43

////////////////////////////////////////


// form click event
form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  let file = target.files[0]; //getting file [0] this means if user has selected multiple files then get first one only
  if(file){
    let fileName = file.name; //getting file name
    console.log(fileName);
    fileTypeCheck(fileName);
    if(fileName.length >= 12){ //if file name length is greater than 12 then split it and add ...
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName); //calling uploadFile with passing file name as an argument
  }
}

// file upload function
function uploadFile(name){
  let xhr = new XMLHttpRequest(); //creating new xhr object (AJAX)
  xhr.open("POST", "php/upload.php"); //sending post request to the specified URL
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{ //file uploading progress event
    let fileLoaded = Math.floor((loaded / total) * 100);  //getting percentage of loaded file size
    let fileTotal = Math.floor(total / 1000); //gettting total file size in KB from bytes
    let fileSize;
    // if file size is less than 1024 then add only KB else convert this KB into MB
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    // uploadedArea.innerHTML = ""; //uncomment this line if you don't want to show upload history
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      // uploadedArea.innerHTML = uploadedHTML; //uncomment this line if you don't want to show upload history
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history
    }
  });
  let data = new FormData(form); //FormData is an object to easily send form data
  xhr.send(data); //sending form data
}


function fileTypeCheck(fileName){
  // show 4 last element of text
  let str = fileName;
  str = str.substring(str.length - 5, str.length);
  const foundPNG = png.some(r=> str.indexOf(r) >= 0)
  const foundVIDEO = video.some(r=> str.indexOf(r) >= 0)
  const foundAUDIO = audioForma.some(r=> str.indexOf(r) >= 0)
  const foundPDF = pdf.some(r=> str.indexOf(r) >= 0)

  if(foundPNG){
    console.log(foundPNG);
    console.log(str);
  } else if(foundVIDEO){
    console.log(foundVIDEO);
    console.log(str);
  } else if(foundAUDIO){
    console.log(foundAUDIO);
    console.log(str);
  } else if(foundPDF){
    console.log(foundPDF);
    console.log(str);
  }
  else {
    alert("Bad file!")
  }
}



// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Open right side

const toggleBtn = document.getElementById('openRightPanel');
const expandElement = document.querySelector('.rightDivSection1');
const leftDivSection1 = document.querySelector('.leftDivSection1');
const exitButtonRight = document.querySelector('#exitButtonRight');


var openClose = false;

toggleBtn.addEventListener('click', function() {
  openClose = !openClose
  expandElement.classList.toggle('active'); /* dodajemy lub usuwamy klasę 'active' */
  if(window.innerWidth < 751 && openClose) {
    // leftDivSection1.style.display = "none";
    leftDivSection1.classList.toggle('active'); /* dodajemy lub usuwamy klasę 'active' */
    expandElement.style.margin = "0";
    // leftDivSection1.style.right = "-200%"
  }
});

exitButtonRight.addEventListener('click', function() {
  openClose = !openClose
  expandElement.classList.toggle('active'); /* dodajemy lub usuwamy klasę 'active' */
  if(window.innerWidth < 751 && !openClose) {
    leftDivSection1.classList.toggle('active'); /* dodajemy lub usuwamy klasę 'active' */
    // leftDivSection1.style.right = "0%"
    expandElement.style.margin = "0";
  }
});

