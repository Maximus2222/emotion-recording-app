let loginForm: HTMLFormElement;
let loginButton: HTMLInputElement;
let loginErrorMsg: HTMLParagraphElement;
window.onload = function Initialize() {
    loginForm = document.getElementById("login-form") as HTMLFormElement;
    loginButton = document.getElementById("login-button") as HTMLInputElement;
    loginErrorMsg = document.getElementById("login-error") as HTMLParagraphElement;

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.username.value;
        if (username == "" || password == "") {
            loginErrorMsg.innerHTML = "Füllen Sie alle Felder aus.";
            loginErrorMsg.style.display = "flex";
        }
        else {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("GET", "/api/users/search/" + username);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 201) {
                    console.log(xhr.response);
                }
            }
            xhr.onload = () => {
                checkLoginData(xhr.response);
            }
            xhr.send();
        }
    })
}
function checkLoginData(user: any) {
    if (user) {
        const password = loginForm.password.value;
        let pw = user.password;
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