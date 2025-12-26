import Gallows from "./modules/gallows.js";
import Word from "./modules/word.js";
import { getGoodQuote, getBadQuote } from "./modules/word.js";

const usedfield = document.getElementById("usedfield");
const table = document.getElementById("table")
const canvas = document.getElementById("myCanvas");
const message = document.getElementById("message");
const gallows = new Gallows(canvas)
const words = new Word()

let secret;
let hits = 0
let ingame = true
let usedLetters = []

document.addEventListener("keypress", function (event) {
    if (!usedLetters.includes(event.key) && ingame) {
        let contains = false
        for (let i = 0; i < secret.length; i++) {
            if (secret[i] == event.key) {
                document.getElementById("c-" + i).innerText = event.key.toUpperCase()
                contains = true
                hits++
            }
        }
        usedLetters.push(event.key)
        if (contains) {
            usedfield.innerHTML += "<span style='color: green'>" + event.key + " </span>"
            message.style.color = "green";
            message.innerText = getGoodQuote();
            if (hits == secret.length) {
                endGame(true)
            }
        } else {
            usedfield.innerHTML += "<span style='color: red'>" + event.key + " </span>"
            var b = gallows.printError()
            message.style.color = "red";
            message.innerText = getBadQuote();
            if (b) {
                endGame(false)
            }
        }
    }
});
window.addEventListener("load", async() => {
    secret = await words.getRandomWord()
    var elements = "";
    console.log(secret)
    for (let i = 0; i < secret.length; i++) {
        elements += '<td id="c-' + i + '"></td>'
    }
    table.innerHTML += "<tr>" + elements + "</tr>"
    gallows.setColor("rgba(169,169,169,0.25)")
    gallows.printAll()
    gallows.setColor("rgba(169,169,169,1)")
})

function endGame(b) {
    if (b) {
        message.style.color = "green"
        message.innerText = "Sikeresen kitaláltad! " + String.fromCodePoint(129395)
        for (let i = 0; i < secret.length; i++) {
            document.getElementById("c-" + i).style.color = "green"
        }
    } else {
        message.style.color = "red"
        message.innerText = `Sajnos ez most nem sikerült! ` + String.fromCodePoint(128532)
        for (let i = 0; i < secret.length; i++) {
            const letter = document.getElementById("c-" + i)
            if (letter.innerText == "") {
                letter.style.color = "red"
                letter.innerText = secret[i].toUpperCase()
            }
        }
    }
    ingame = false
    message.innerHTML += '<br><button onclick="location.reload()" type="button" class="btn btn-outline-light">Újra!</button>'
}


