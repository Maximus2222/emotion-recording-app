let games: string[] = [];
let gScrollUpButton: HTMLButtonElement;
let gScrollDownButton: HTMLButtonElement;
let userInfo: HTMLParagraphElement;
let gameslist: any[];
let gButtonArray: HTMLButtonElement[] = new Array<HTMLButtonElement>();

window.onload = function Initialize() {
  loadUserG();
  gScrollUpButton = document.getElementById("scrollup") as HTMLButtonElement;
  gScrollDownButton = document.getElementById("scrolldown") as HTMLButtonElement;
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open("GET", "/api/games");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 201) {
      console.log(xhr.response);
    }
  }
  xhr.send();
  xhr.onload = () => {
    gameslist = xhr.response;
    loadGames();
  }
}
function loadUserG() {
  let user = sessionStorage.getItem("user");
  userInfo = document.getElementById("userinfo") as HTMLParagraphElement;
  if (user) {
      userInfo.innerHTML = user;
  }
}

function loadGames() {
  if (gameslist) {
    for (let i = 0; i < gameslist.length; i++) {
      games.push(gameslist[i].name)
    }
  }
  if (games) {
    if (games.length > 5) {
      gScrollDownButton.style.display = "block";
    }
    for (let i = 0; i < games.length; i++) {
      addGame(games[i], i);
    }
  }
  gButtonArray.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      let game = button.innerText;
      sessionStorage.setItem("game", game);
      sessionStorage.setItem("gamePlayID", Date.now()+"");
      window.location.href = "eventselect.html";
    })
  }
  )
}

function addGame(game: string, index: number): void {

  var element = document.createElement("button");

  element.type = "button";
  element.innerText = game;
  element.style.display = "flex";
  element.setAttribute("class", "button-selection elementname gbutton");
  if (index > 4) {
    element.style.display = "none";
  }

  var btnArea = document.getElementById("eventbtns");

  btnArea!.appendChild(element);
  gButtonArray.push(element);
}

function logout(): void {
  sessionStorage.clear();
  window.location.href = "login.html";
}
function gScrollDown(): void {
  for (let i = gButtonArray.length - 1; i >= 0; i--) {
    if (i != 0) {
      if (gButtonArray[i].style.display == "none") {
        if (gButtonArray[i - 1].style.display == "flex") {
          gButtonArray[i].style.display = "flex";
        }
      }
      else {
        if (gButtonArray[i - 1].style.display == "none") {
          gButtonArray[i].style.display = "none";
        }
      }
    }
    else {
      gButtonArray[i].style.display = "none";
    }

  }
  gScrollUpButton.style.display = "block";
  if (gButtonArray[gButtonArray.length - 1].style.display == "flex") {
    gScrollDownButton.style.display = "none";
  }
}

function gScrollUp(): void {
  for (let i = 0; i <= gButtonArray.length - 1; i++) {
    if (i != gButtonArray.length - 1) {
      if (gButtonArray[i].style.display == "none") {
        if (gButtonArray[i + 1].style.display == "flex") {
          gButtonArray[i].style.display = "flex";
        }
      }
      else {
        if (gButtonArray[i + 1].style.display == "none") {
          gButtonArray[i].style.display = "none";
        }
      }
    }
    else {
      gButtonArray[i].style.display = "none";
    }

  }
  gScrollDownButton.style.display = "block";
  if (gButtonArray[0].style.display == "flex") {
    gScrollUpButton.style.display = "none";
  }
}