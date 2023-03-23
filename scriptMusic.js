// ///////////////////////////////// Music //////////////////////////////////// //

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const playButtonImg = document.getElementById("playButtonImg");
const stopBtn = document.getElementById("stop");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");
const volumeImg = document.getElementById("volumeImg");

// znaczniki
const markStartBtn = document.getElementById("markStart");
const markEndBtn = document.getElementById("markEnd");
const loopBtn = document.getElementById("loopZn");
const LoopTags = document.getElementById("LoopImg");
const firstZn = document.querySelector(".progress-bar__marker--start");
const secZn = document.querySelector(".progress-bar__marker--end");
const resetZn = document.querySelector("#resetZn");
let startZn = 0;
let endZn = 0;
let loopZn = false;
// button on/off
const toggleBtnImg = document.getElementById("toggleBtnImg");
// tworzymy zmienną, która będzie przechowywać stan przycisku
let isOn = false;
toggleBtnImg.src = "img/no-repeat2.png";

// dodajemy nasłuchiwanie na kliknięcie w przycisk
toggleBtnImg.addEventListener("click", function () {
  if (isOn) {
    // jeśli przycisk był już włączony, to go wyłączamy
    isOn = false;
    audio.loop = isOn;
    toggleBtnImg.src = "img/no-repeat2.png";
  } else {
    // jeśli przycisk był wyłączony, to go włączamy
    isOn = true;
    audio.loop = isOn;
    toggleBtnImg.src = "img/repeatOne.png";
  }
});

let PlayPause = true;
playButtonImg.src = "img/play-button.png";
// Play Button
playBtn.addEventListener("click", function () {
  if (PlayPause) {
    // jeśli przycisk był wyłączony, to go włączamy
    PlayPause = false;
    playButtonImg.src = "img/pause.png";
    playAudio();
  } else {
    // jeśli przycisk był już włączony, to go wyłączamy
    PlayPause = true;
    playButtonImg.src = "img/play-button.png";
    pauseAudio();
  }
});


markStartBtn.addEventListener("click", function () {
  startZn = audio.currentTime;
  var lle = startZn / audio.duration;
  firstZn.style.left = lle * 100 + "%";
  firstZn.style.display = "flex";
});

markEndBtn.addEventListener("click", function () {
  endZn = audio.currentTime;
  var lle = endZn / audio.duration;
  secZn.style.left = lle * 100 + "%";
  secZn.style.display = "flex";
});


// LoopTags.src = "img/play-button.png";
LoopTags.addEventListener("click", function () {
  if (startZn >= 0 && endZn >= 0) {
    loopZn = !loopZn;
    if (loopZn) {
        LoopTags.style.filter = "invert(16%) sepia(85%) saturate(2043%) hue-rotate(238deg) brightness(94%) contrast(105%)";
        LoopTags.style.transform = 'scale(1.5)';
        audio.currentTime = startZn;
    } else {
        LoopTags.style.filter = "invert(86%) sepia(82%) saturate(5129%) hue-rotate(173deg) brightness(105%) contrast(105%)";
        LoopTags.style.transform = 'scale(1)'
    }
  }
});

resetZn.addEventListener("click", function () {
  firstZn.style.display = "none";
  secZn.style.display = "none";
  startZn = 0;
  endZn = 0;
  loopZn = false;
});

function playAudio() {
  audio.play();
}

audio.addEventListener("timeupdate", function () {
  if (loopZn && audio.currentTime >= endZn) {
    audio.currentTime = startZn;
  }
});

function pauseAudio() {
  audio.pause();
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  firstZn.style.display = "none";
  secZn.style.display = "none";
  startZn = 0;
  endZn = 0;
  loopZn = false;
  PlayPause = true;
  playButtonImg.src = "img/play-button.png";
}

function updateProgress() {
  const value = (audio.currentTime / audio.duration) * 100;
  progress.value = value;
}

function setProgress() {
  audio.currentTime = (progress.value / 100) * audio.duration;
}

function setVolume() {
  audio.volume = volumeSlider.value;
  if(audio.volume < 0.45)
  {
    volumeImg.src = "img/low-volume.png";
  }
  if (audio.volume < 0.1){
    volumeImg.src = "img/zero-volume.png";
  } 
  if (audio.volume > 0.45){
    volumeImg.src = "img/medium-volume.png";
  }
  if (audio.volume > 0.85){
    volumeImg.src = "img/max-volume.png";
  }
}

// Event listeners
// playBtn.addEventListener("click", playAudio);
// pauseBtn.addEventListener("click", pauseAudio);
stopBtn.addEventListener("click", stopAudio);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);
volumeSlider.addEventListener("input", setVolume);

// time
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");

audio.addEventListener("loadedmetadata", () => {
  const time = formatTime(audio.duration);
  duration.textContent = time;
});

audio.addEventListener("timeupdate", () => {
  const time = formatTime(audio.currentTime);
  currentTime.textContent = time;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// open question
const questionToggles = document.querySelectorAll(".question-toggle");

questionToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    const question = event.target.closest(".question");
    question.classList.toggle("open");
  });
});

