window.onload = function Initialize() {
    loadUserA();
    const aButtonArray: HTMLButtonElement[] = Array.from(document.getElementsByClassName("button-value")) as HTMLButtonElement[];
    aButtonArray.forEach((button) => {
        let value = button.value;
        button.addEventListener("click", (e) => {
            e.preventDefault();
            let username = sessionStorage.getItem("user");
            const xhr = new XMLHttpRequest();
            xhr.responseType='json';
            xhr.open("GET", "/api/users/search/" + username);
            xhr.onload = () => {
                let date = new Date();
                const user=xhr.response;
                const userID=user.id;
                const xhr1 = new XMLHttpRequest();
                xhr1.open("POST", "/api/records");
                xhr1.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                xhr1.onreadystatechange = () => {
                    if (xhr1.readyState === 4 && xhr1.status === 201) {
                        sessionStorage.removeItem("valence");
                        sessionStorage.removeItem("activity");
                        window.location.href = "eventselect.html";
                    }
                }
                xhr1.send(JSON.stringify({
                    "userID": userID,
                    "game": sessionStorage.getItem("game"),
                    "gamePlayID": Number(sessionStorage.getItem("gamePlayID")),
                    "event": sessionStorage.getItem("event"),
                    "valence": sessionStorage.getItem("valence"),
                    "activity": value,
                    "timestamp": date.toLocaleString()
                }));
            }
            xhr.send();
        })
    }
    )
}

function loadUserA() {
    let user = sessionStorage.getItem("user");
    userInfo = document.getElementById("userinfo") as HTMLParagraphElement;
    if (user) {
        userInfo.innerHTML = user;
    }
}

