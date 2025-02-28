var registerForm;
var registerButton;
var registerErrorMsg;
window.onload = function Initialize() {
    registerForm = document.getElementById("register-form");
    registerButton = document.getElementById("register-button");
    registerErrorMsg = document.getElementById("register-error");
    registerButton.addEventListener("click", function (e) {
        e.preventDefault();
        var username = registerForm.username.value;
        var password = registerForm.password.value;
        if (username == "" || password == "") {
            registerErrorMsg.innerHTML = "Füllen Sie alle Felder aus.";
            registerErrorMsg.style.display = "flex";
        }
        else {
            var xhr_1 = new XMLHttpRequest();
            xhr_1.responseType = 'json';
            xhr_1.open("GET", "/api/users/search/" + username);
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === 4) {
                    console.log(xhr_1.response);
                }
            };
            xhr_1.onload = function () {
                var regdata = {
                    "username": username,
                    "password": password
                };
                checkUser(JSON.stringify(regdata), xhr_1.response);
            };
            xhr_1.send();
        }
    });
};
function checkUser(registerdata, user) {
    if (user) {
        registerErrorMsg.innerHTML = "Nutzername bereits vergeben.";
        registerErrorMsg.style.display = "flex";
    }
    else {
        var xhr1_1 = new XMLHttpRequest();
        xhr1_1.open("POST", "/api/users");
        xhr1_1.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr1_1.onreadystatechange = function () {
            if (xhr1_1.readyState === 4) {
                sessionStorage.setItem("user", registerForm.username.value);
                window.location.href = "gameselect.html";
            }
        };
        xhr1_1.send(registerdata);
    }
}
