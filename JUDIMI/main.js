const passwordInput = document.getElementById("password")
const text = document.querySelector(".dinoText")


const login = function() {
    document.querySelector(".loginPage").style.display = "none"
    document.querySelector(".content").style.display = "block"

}


passwordInput.addEventListener("input", () => {
    let input = passwordInput.value.toLowerCase()
    console.log(input)
    if (input == "julia" || input == "ja") {
        login()
    }
})

const dinos = [...document.querySelectorAll(".dino")]

for (let dino of dinos) {
    dino.addEventListener("mouseenter", (e) => {
       text.innerText = e.target.querySelector("span").innerText
    })
}


document.querySelector("button").addEventListener("click", () => {
    console.log("klik")
    document.querySelector(".loginPage").style.display = "none"
    document.querySelector(".content").style.display = "none"
    document.querySelector(".system").style.display = "flex"
})