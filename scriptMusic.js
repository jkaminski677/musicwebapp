// ///////////////////////////////// Music //////////////////////////////////// //

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const loopCheckbox = document.getElementById("loop");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");
// znaczniki
const markStartBtn = document.getElementById("markStart");
const markEndBtn = document.getElementById("markEnd");
const loopBtn = document.getElementById("loopZn");
const firstZn = document.querySelector(".progress-bar__marker--start");
const secZn = document.querySelector(".progress-bar__marker--end");
const resetZn = document.querySelector("#resetZn");
let startZn = 0;
let endZn = 0;
let loopZn= false;


markStartBtn.addEventListener("click", function () {
  startZn = audio.currentTime;
  var lle = startZn / audio.duration;
  firstZn.style.left = lle * 100 + "%";
  firstZn.style.display = "block";
});

markEndBtn.addEventListener("click", function () {
  endZn = audio.currentTime;
  var lle = endZn / audio.duration;
  secZn.style.left = lle * 100 + "%";
  secZn.style.display = "block";
});

loopBtn.addEventListener("click", function () {
  console.log(startZn);
  console.log(endZn);
  if (startZn > 0 && endZn > 0) {
    

    loopZn = !loopZn;
    if (loopZn) {
      audio.currentTime = startZn;
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
}

function loopAudio() {
  audio.loop = loopCheckbox.checked;
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
}

// Event listeners
playBtn.addEventListener("click", playAudio);
pauseBtn.addEventListener("click", pauseAudio);
stopBtn.addEventListener("click", stopAudio);
loopCheckbox.addEventListener("change", loopAudio);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("change", setProgress);
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
