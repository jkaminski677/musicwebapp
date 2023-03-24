//  /////////////// Upload file ////////////////

const popup = document.querySelector(".popup"),
  form = document.querySelector(".uploadform"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");
var NameOfFile = "";
const png = [
  "png",
  "jpeg",
  "jpg",
  "gif",
  "tiff",
  "psd",
  "pdf",
  "esp",
  "ai",
  "jfif",
  "raw",
];
const video = [
  "mp4",
  "webm",
  "mkv",
  "flv",
  "vob",
  "ogv",
  "ogg",
  "drc",
  "gif",
  "gifv",
  "mng",
  "avi",
  "mov",
  "gt",
  "wmv",
  "asf",
];
const audioFormat = [
  "acc",
  "aif",
  "flac",
  "iff",
  "m4a",
  "m4b",
  "mid",
  "midi",
  "mp3",
  "mpa",
  "mpc",
  "oga",
  "ogg",
  "opus",
  "ra",
  "ram",
  "snd",
  "wav",
  "wma",
  "3gp",
  "aa",
  "aax",
  "act",
  "dvf",
  "m4p",
  "mpc",
  "wv",
  "webm",
  "8svx",
];
const pdf = ["pdf", "txt"];

// form click event
form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0]; //getting file [0] this means if user has selected multiple files then get first one only
  if (file) {
    let fileName = //getting file name
      (NameOfFile = file.name);
    console.log(fileName);
    fileTypeCheck(fileName);
    if (fileName.length >= 12) {
      //if file name length is greater than 12 then split it and add ...
      let splitName = fileName.split(".");
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName); //calling uploadFile with passing file name as an argument
  }
};

// file upload function
function uploadFile(name) {
  let xhr = new XMLHttpRequest(); //creating new xhr object (AJAX)
  xhr.open("POST", "php/upload.php"); //sending post request to the specified URL
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    //file uploading progress event
    let fileLoaded = Math.floor((loaded / total) * 100); //getting percentage of loaded file size
    let fileTotal = Math.floor(total / 1000); //gettting total file size in KB from bytes
    let fileSize;
    // if file size is less than 1024 then add only KB else convert this KB into MB
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
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
    if (loaded == total) {
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
      uploadedArea.innerHTML = uploadedHTML; //uncomment this line if you don't want to show upload history
      //   uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history
    }
  });
  let data = new FormData(form); //FormData is an object to easily send form data
  xhr.send(data); //sending form data
}

function fileTypeCheck(fileName) {
  // show 4 last element of text
  let str = fileName;
  str = str.substring(str.length - 5, str.length);
  const foundPNG = png.some((r) => str.indexOf(r) >= 0);
  const foundVIDEO = video.some((r) => str.indexOf(r) >= 0);
  const foundAUDIO = audioFormat.some((r) => str.indexOf(r) >= 0);
  const foundPDF = pdf.some((r) => str.indexOf(r) >= 0);

  if (foundPNG) {
    console.log(foundPNG);
    console.log(str);
  } else if (foundVIDEO) {
    console.log(foundVIDEO);
    console.log(str);
  } else if (foundAUDIO) {
    console.log(foundAUDIO);
    console.log(str);
  } else if (foundPDF) {
    console.log(foundPDF);
    console.log(str);
  } else {
    alert("Bad file!");
  }
}

// ///////////////////////// End Upload file /////////////////////////////////////////////////////////////////////////////////////////////////

// /////////////////// AdSong /////////////////////////////////////

const AddSongButton = document.getElementById("AddSongButton");
const PopupContent = document.getElementById("PopupContent");
const AreYouSure = document.getElementById("AreYouSure");

const PopupCloseButton = document.getElementById("PopupCloseButton");
const AreYouSureButttonYes = document.getElementById("AreYouSureButttonYes");
const AreYouSureButttonNo = document.getElementById("AreYouSureButttonNo");

const body = document.querySelector("body");
var isPopupOn = false;

AddSongButton.addEventListener("click", function () {
  isPopupOnOff();
  PopupContent.classList.add("active"); /* dodaje klasę 'active' */
});

PopupCloseButton.addEventListener("click", function () {
  AreYouSure.classList.add("active"); /* usuwa klasę 'active' */
});

AreYouSureButttonNo.addEventListener("click", function () {
  PopupContent.classList.add("active"); /* dodaje klasę 'active' */
  AreYouSure.classList.remove("active"); /* dodaje klasę 'active' */
});

AreYouSureButttonYes.addEventListener("click", function () {
  clearInputs();
  isPopupOnOff();
  PopupContent.classList.remove("active"); /* dodaje klasę 'active' */
  AreYouSure.classList.remove("active"); /* dodaje klasę 'active' */
});

PopupContent.addEventListener("click", function (event) {
  if (event.target === this) {
    isPopupOnOff();
    PopupContent.classList.remove(
      "active"
    ); /* usuwa klasę 'active' po kliknięciu w tło */
  }
});

function isPopupOnOff() {
  isPopupOn = !isPopupOn;
  if (isPopupOn) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
}

// ///// chat audio upload
const audioList = document.getElementById("audio-list");
// const sopranoList = document.getElementById("soprano-list");
// const altoList = document.getElementById("alto-list");
// const tenorList = document.getElementById("tenor-list");
// const bassList = document.getElementById("bass-list");
const title1 = document.getElementById("title");
const category1 = document.getElementById("category");
const audioFile1 = document.getElementById("audioInput");

function addAudio() {
  const category = document.getElementById("category").value;
  const audioFile = document.getElementById("audioInput").files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const audioUrl = e.target.result;
    const li = document.createElement("li");
    const audio = document.createElement("audio");
    audio.setAttribute("controls", "");
    audio.setAttribute("src", audioUrl);
    li.innerHTML = `${category} (${NameOfFile}): `;
    li.appendChild(audio);
    audioList.appendChild(li);
  };
  reader.readAsDataURL(audioFile);
}
// console.log(NameOfFile)
function clearInputs() {
  title1.value = "";
  audioFile1.value = "";
  category1.value = "";
  while (audioList.firstChild) {
    audioList.removeChild(audioList.firstChild);
  }
  while (uploadedArea.firstChild) {
    uploadedArea.removeChild(uploadedArea.firstChild);
  }
}


//  end chat audio upload

// /////////////////// End AdSong /////////////////////////////////////
