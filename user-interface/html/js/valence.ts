window.onload = function Initialize() {
    loadUserV();
    const vButtonArray: HTMLButtonElement[] = Array.from(document.getElementsByClassName("button-value")) as HTMLButtonElement[];
    vButtonArray.forEach((button) => {
        let value = button.value;
        button.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.setItem("valence", value);
            window.location.href = "activity.html";
        })
    }
    )
}
function loadUserV() {
    let user = sessionStorage.getItem("user");
    userInfo = document.getElementById("userinfo") as HTMLParagraphElement;
    if (user) {
        userInfo.innerHTML = user;
    }
  }

