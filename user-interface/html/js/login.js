var loginForm;
var loginButton;
var loginErrorMsg;
window.onload = function Initialize() {
    loginForm = document.getElementById("login-form");
    loginButton = document.getElementById("login-button");
    loginErrorMsg = document.getElementById("login-error");
    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        var username = loginForm.username.value;
        var password = loginForm.username.value;
        if (username == "" || password == "") {
            loginErrorMsg.innerHTML = "Füllen Sie alle Felder aus.";
            loginErrorMsg.style.display = "flex";
        }
        else {
            var xhr_1 = new XMLHttpRequest();
            xhr_1.responseType = 'json';
            xhr_1.open("GET", "/api/users/search/" + username);
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4 && xhr_1.status === 201) {
                    console.log(xhr_1.response);
                }
            };
            xhr_1.onload = function () {
                checkLoginData(xhr_1.response);
            };
            xhr_1.send();
        }
    });
};
function checkLoginData(user) {
    if (user) {
        var password = loginForm.password.value;
        var pw = user.password;
        if (password == pw) {
            sessionStorage.setItem("user", user.username);
            window.location.href = "gameselect.html";
        }
        else {
            loginErrorMsg.innerHTML = "Nutzername oder Passwort falsch.";
            loginErrorMsg.style.display = "flex";
        }
    }
    else {
        loginErrorMsg.innerHTML = "Nutzername oder Passwort falsch.";
        loginErrorMsg.style.display = "flex";
    }
}
