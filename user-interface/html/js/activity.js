window.onload = function Initialize() {
    loadUserA();
    var aButtonArray = Array.from(document.getElementsByClassName("button-value"));
    aButtonArray.forEach(function (button) {
        var value = button.value;
        button.addEventListener("click", function (e) {
            e.preventDefault();
            var username = sessionStorage.getItem("user");
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open("GET", "/api/users/search/" + username);
            xhr.onload = function () {
                var date = new Date();
                var user = xhr.response;
                var userID = user.id;
                var xhr1 = new XMLHttpRequest();
                xhr1.open("POST", "/api/records");
                xhr1.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                xhr1.onreadystatechange = function () {
                    if (xhr1.readyState === 4 && xhr1.status === 201) {
                        sessionStorage.removeItem("valence");
                        sessionStorage.removeItem("activity");
                        window.location.href = "eventselect.html";
                    }
                };
                xhr1.send(JSON.stringify({
                    "userID": userID,
                    "game": sessionStorage.getItem("game"),
                    "gamePlayID": Number(sessionStorage.getItem("gamePlayID")),
                    "event": sessionStorage.getItem("event"),
                    "valence": sessionStorage.getItem("valence"),
                    "activity": value,
                    "timestamp": date.toLocaleString()
                }));
            };
            xhr.send();
        });
    });
};
function loadUserA() {
    var user = sessionStorage.getItem("user");
    userInfo = document.getElementById("userinfo");
    if (user) {
        userInfo.innerHTML = user;
    }
}
