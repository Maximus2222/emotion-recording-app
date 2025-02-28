let eScrollUpButton: HTMLButtonElement;
let eScrollDownButton: HTMLButtonElement;
let events: string[] = []
let prevevent: any;
let currentGame: any;

let eButtonArray: HTMLButtonElement[] = new Array<HTMLButtonElement>();

window.onload = function Initialize() {
  loadUserE();
  eScrollUpButton = document.getElementById("scrollup") as HTMLButtonElement;
  eScrollDownButton = document.getElementById("scrolldown") as HTMLButtonElement;

  let currentGameName = sessionStorage.getItem("game");
  let preveventname = sessionStorage.getItem("event")

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  if (preveventname) {
    xhr.open("GET", "/api/events/search/" + preveventname);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 201) {
        console.log(xhr.response);
      }
    }
    xhr.onload = () => {
      prevevent = xhr.response;
      events = prevevent.successors;
      loadEvents();
    }
    xhr.send();
  }
  else {
    xhr.open("GET", "/api/games/search/" + currentGameName);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 201) {
        console.log(xhr.response);
      }
    }
    xhr.onload = () => {
      currentGame = xhr.response;
      events = currentGame.startevents;
      loadEvents();
    }
    xhr.send();
  }
}
function loadUserE() {
  let user = sessionStorage.getItem("user");
  userInfo = document.getElementById("userinfo") as HTMLParagraphElement;
  if (user) {
      userInfo.innerHTML = user;
  }
}

function loadEvents() {
  if (events.length > 5) {
    eScrollDownButton.style.display = "block";
  }

  for (let i = 0; i < events.length; i++) {
    addEvent(events[i], i);
  }
  eButtonArray.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      let event = button.innerHTML;
      sessionStorage.setItem("event", event);
      window.location.href = "valence.html";
    })
  }
  )
}

function addEvent(event: string, index: number) {

  var element = document.createElement("button");

  element.type = "button";
  element.innerText = event;
  element.style.display = "flex";
  element.setAttribute("class", "button-selection elementname ebutton");
  if (index > 4) {
    element.style.display = "none";
  }

  var btnArea = document.getElementById("eventbtns");

  btnArea!.appendChild(element);
  eButtonArray.push(element);
}

function endgame(): void {
  sessionStorage.removeItem("event");
  sessionStorage.removeItem("game");
  sessionStorage.removeItem("gamePlayID");
  window.location.href = "gameselect.html";
}
function eScrollDown(): void {
  for (let i = eButtonArray.length - 1; i >= 0; i--) {
    if (i != 0) {
      if (eButtonArray[i].style.display == "none") {
        if (eButtonArray[i - 1].style.display == "flex") {
          eButtonArray[i].style.display = "flex";
        }
      }
      else {
        if (eButtonArray[i - 1].style.display == "none") {
          eButtonArray[i].style.display = "none";
        }
      }
    }
    else {
      eButtonArray[i].style.display = "none";
    }

  }
  eScrollUpButton.style.display = "block";
  if (eButtonArray[eButtonArray.length - 1].style.display == "flex") {
    eScrollDownButton.style.display = "none";
  }
}

function eScrollUp(): void {
  for (let i = 0; i <= eButtonArray.length - 1; i++) {
    if (i != eButtonArray.length - 1) {
      if (eButtonArray[i].style.display == "none") {
        if (eButtonArray[i + 1].style.display == "flex") {
          eButtonArray[i].style.display = "flex";
        }
      }
      else {
        if (eButtonArray[i + 1].style.display == "none") {
          eButtonArray[i].style.display = "none";
        }
      }
    }
    else {
      eButtonArray[i].style.display = "none";
    }

  }
  eScrollDownButton.style.display = "block";
  if (eButtonArray[0].style.display == "flex") {
    eScrollUpButton.style.display = "none";
  }
}
