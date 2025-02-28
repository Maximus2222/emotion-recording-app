var games = [];
var gScrollUpButton;
var gScrollDownButton;
var userInfo;
var gameslist;
var gButtonArray = new Array();
window.onload = function Initialize() {
    loadUserG();
    gScrollUpButton = document.getElementById("scrollup");
    gScrollDownButton = document.getElementById("scrolldown");
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("GET", "/api/games");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log(xhr.response);
        }
    };
    xhr.send();
    xhr.onload = function () {
        gameslist = xhr.response;
        loadGames();
    };
};
function loadUserG() {
    var user = sessionStorage.getItem("user");
    userInfo = document.getElementById("userinfo");
    if (user) {
        userInfo.innerHTML = user;
    }
}
function loadGames() {
    if (gameslist) {
        for (var i = 0; i < gameslist.length; i++) {
            games.push(gameslist[i].name);
        }
    }
    if (games) {
        if (games.length > 5) {
            gScrollDownButton.style.display = "block";
        }
        for (var i = 0; i < games.length; i++) {
            addGame(games[i], i);
        }
    }
    gButtonArray.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            var game = button.innerText;
            sessionStorage.setItem("game", game);
            sessionStorage.setItem("gamePlayID", Date.now() + "");
            window.location.href = "eventselect.html";
        });
    });
}
function addGame(game, index) {
    var element = document.createElement("button");
    element.type = "button";
    element.innerText = game;
    element.style.display = "flex";
    element.setAttribute("class", "button-selection elementname gbutton");
    if (index > 4) {
        element.style.display = "none";
    }
    var btnArea = document.getElementById("eventbtns");
    btnArea.appendChild(element);
    gButtonArray.push(element);
}
function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}
function gScrollDown() {
    for (var i = gButtonArray.length - 1; i >= 0; i--) {
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
function gScrollUp() {
    for (var i = 0; i <= gButtonArray.length - 1; i++) {
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
