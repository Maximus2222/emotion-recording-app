window.onload = function Initialize() {
    loadUserV();
    var vButtonArray = Array.from(document.getElementsByClassName("button-value"));
    vButtonArray.forEach(function (button) {
        var value = button.value;
        button.addEventListener("click", function (e) {
            e.preventDefault();
            sessionStorage.setItem("valence", value);
            window.location.href = "activity.html";
        });
    });
};
function loadUserV() {
    var user = sessionStorage.getItem("user");
    userInfo = document.getElementById("userinfo");
    if (user) {
        userInfo.innerHTML = user;
    }
}
