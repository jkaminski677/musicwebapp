// /////////////// Open right side ////////////////////////// //



const toggleBtn = document.getElementById("openRightPanel");
const expandElement = document.querySelector(".rightDivSection1");
const leftDivSection1 = document.querySelector(".leftDivSection1");
const exitButtonRight = document.querySelector("#exitButtonRight");
const hidebutton = document.querySelector("#hidebutton");
const fukyou = document.querySelector(".fuk-you");

var openClose = false;

// check ip addres
// fetch('https://api.ipify.org/').then(
//     r => r.text()
// ).then(console.log);

//cie - 46.204.12.43
//biels - 46.204.105.91 oraz 46.204.101.130 
////////////////////////////////////////



toggleBtn.addEventListener("click", function () {
  openClose = !openClose;
  expandElement.classList.toggle(
    "active"
  ); /* dodajemy lub usuwamy klasę 'active' */
  if (window.innerWidth < 751 && openClose) {
    // leftDivSection1.style.display = "none";
    leftDivSection1.classList.toggle(
      "active"
    ); /* dodajemy lub usuwamy klasę 'active' */
    expandElement.style.margin = "0";
    // leftDivSection1.style.right = "-200%"
  }
});

exitButtonRight.addEventListener("click", function () {
  openClose = !openClose;
  expandElement.classList.toggle(
    "active"
  ); /* dodajemy lub usuwamy klasę 'active' */
  if (window.innerWidth < 751 && !openClose) {
    leftDivSection1.classList.toggle(
      "active"
    ); /* dodajemy lub usuwamy klasę 'active' */
    // leftDivSection1.style.right = "0%"
    expandElement.style.margin = "0";
  }
});

var openhiddenbyt = false;
hidebutton.addEventListener("click", function () {
  
  // fetch('https://api.ipify.org/').then(
  //   r => r.text()
  // ).then(console.log)
  fetch('https://api.ipify.org/')
  .then(r => r.text())
  .then(ip => {
      const ipAddressElement = document.getElementById('ip-addres-show');
      ipAddressElement.textContent = ip;
    }
  );
  openhiddenbyt = !openhiddenbyt;
  fukyou.classList.toggle("active"); /* dodajemy lub usuwamy klasę 'active' */
});


// /////////////// End Open right side ////////////////////////// //

