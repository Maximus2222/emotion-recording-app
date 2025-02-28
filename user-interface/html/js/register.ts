let registerForm: HTMLFormElement;
let registerButton: HTMLInputElement;
let registerErrorMsg: HTMLParagraphElement;
window.onload = function Initialize() {
    registerForm = document.getElementById("register-form") as HTMLFormElement;
    registerButton = document.getElementById("register-button") as HTMLInputElement;
    registerErrorMsg = document.getElementById("register-error") as HTMLParagraphElement;

    registerButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = registerForm.username.value;
        const password = registerForm.password.value;
        if (username == "" || password == "") {
            registerErrorMsg.innerHTML = "Füllen Sie alle Felder aus.";
            registerErrorMsg.style.display = "flex";
        }
        else {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("GET", "/api/users/search/" + username);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    console.log(xhr.response);
                }
            }
            xhr.onload = () => {
                let regdata = {
                    "username": username,
                    "password": password
                }
                checkUser(JSON.stringify(regdata), xhr.response);
            }
            xhr.send()
        }
    })
}
function checkUser(registerdata: string, user: any) {
    if (user) {
        registerErrorMsg.innerHTML = "Nutzername bereits vergeben.";
        registerErrorMsg.style.display = "flex";
    }
    else {
        const xhr1 = new XMLHttpRequest();
        xhr1.open("POST", "/api/users");
        xhr1.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr1.onreadystatechange = () => {
            if (xhr1.readyState === 4) {
                sessionStorage.setItem("user", registerForm.username.value);
                window.location.href = "gameselect.html";
            }
        }
        xhr1.send(registerdata);
    }
}