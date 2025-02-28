var eScrollUpButton;
var eScrollDownButton;
var events = [];
var prevevent;
var currentGame;
var eButtonArray = new Array();
window.onload = function Initialize() {
    loadUserE();
    eScrollUpButton = document.getElementById("scrollup");
    eScrollDownButton = document.getElementById("scrolldown");
    var currentGameName = sessionStorage.getItem("game");
    var preveventname = sessionStorage.getItem("event");
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (preveventname) {
        xhr.open("GET", "/api/events/search/" + preveventname);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                console.log(xhr.response);
            }
        };
        xhr.onload = function () {
            prevevent = xhr.response;
            events = prevevent.successors;
            loadEvents();
        };
        xhr.send();
    }
    else {
        xhr.open("GET", "/api/games/search/" + currentGameName);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 201) {
                console.log(xhr.response);
            }
        };
        xhr.onload = function () {
            currentGame = xhr.response;
            events = currentGame.startevents;
            loadEvents();
        };
        xhr.send();
    }
};
function loadUserE() {
    var user = sessionStorage.getItem("user");
    userInfo = document.getElementById("userinfo");
    if (user) {
        userInfo.innerHTML = user;
    }
}
function loadEvents() {
    if (events.length > 5) {
        eScrollDownButton.style.display = "block";
    }
    for (var i = 0; i < events.length; i++) {
        addEvent(events[i], i);
    }
    eButtonArray.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            var event = button.innerHTML;
            sessionStorage.setItem("event", event);
            window.location.href = "valence.html";
        });
    });
}
function addEvent(event, index) {
    var element = document.createElement("button");
    element.type = "button";
    element.innerText = event;
    element.style.display = "flex";
    element.setAttribute("class", "button-selection elementname ebutton");
    if (index > 4) {
        element.style.display = "none";
    }
    var btnArea = document.getElementById("eventbtns");
    btnArea.appendChild(element);
    eButtonArray.push(element);
}
function endgame() {
    sessionStorage.removeItem("event");
    sessionStorage.removeItem("game");
    sessionStorage.removeItem("gameID");
    window.location.href = "gameselect.html";
}
function eScrollDown() {
    for (var i = eButtonArray.length - 1; i >= 0; i--) {
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
function eScrollUp() {
    for (var i = 0; i <= eButtonArray.length - 1; i++) {
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
