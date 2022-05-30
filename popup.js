console.log("POPUP IS LOOGGING");

let mute = document.querySelector("#mute");
let right = document.querySelector("#right");
let tree = document.querySelector("#tree");
let fire = document.querySelector("#fire");
let white = document.querySelector("#note");
let leave = document.querySelector("#leave");
let rain = document.querySelector("#rain");
let water = document.querySelector("#water");
let soundgrid = document.querySelector(".soundgrid");
let slide2 = document.querySelector(".slide2");
let slides = document.querySelector(".slides");

let dot1 = document.querySelector("#dot1");
let dot2 = document.querySelector("#dot2");
// let dot3 = document.querySelector("#dot3");

////===================MUTE =============================

mute.addEventListener("click", function () {
    chrome.runtime.sendMessage("mute");
});

////===================PAUSE PLAY SOUND =============================

const buttons = document.querySelectorAll(".sound .icon");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        console.log("THIS", this.id);
        chrome.runtime.sendMessage({ sound: this.id });
    });
});

////================================================

const volSlider = document.querySelectorAll(".slider");
volSlider.forEach(function (slider) {
    slider.addEventListener("input", function (e) {
        console.log("SLIDER", this.id);
        // const sliderOf = this.id;
        sliderVol = e.currentTarget.value / 100;
        chrome.runtime.sendMessage({
            setVol: sliderVol,
            singleSlider: this.id,
        });
    });
});

//  NAVBAR

/* Update the variable keeping track of the current slide. */
// cur = next;

right.addEventListener("click", function () {
    console.log("RIGHT");
    slides.classList.add("left");
    slides.classList.remove("right");

    dot2.classList.add("selected");
    dot1.classList.remove("selected");
});
left.addEventListener("click", function () {
    console.log("LEFT");
    slides.classList.add("right");
    slides.classList.remove("left");

    dot2.classList.remove("selected");
    dot1.classList.add("selected");
});

if (soundgrid.classList.contains("on")) {
    slide2.classList.add("off");
} else {
    slide2.classList.add("on");
}

/////// TODOLISTE

// let todoswrapper = $("#todoswrapper");
let todoInput = document.querySelector("#todoinput");
let todoswrapper = document.querySelector("#todoswrapper");
todoInput.addEventListener("keydown", function (e) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let text = document.createTextNode(`♥  ${todoInput.value}`);
    let input = document.createElement("input");

    p.classList.add("todo");
    div.classList.add("todobox");
    input.classList.add("checkbox");
    input.setAttribute("type", "checkbox");

    p.appendChild(text);
    div.appendChild(p);
    div.appendChild(input);

    if (e.keyCode === 13 && todoInput.value !== "") {
        try {
            chrome.storage.local.set({ key: text }, function () {
                console.log("Todo is set to ", text);
            });
        } catch (error) {
            console.log("ERROR IN CATCH", error);
        }

        todoswrapper.appendChild(div);
        todoInput.value = "";
    }
});

let addButton = document.querySelector("#addbutton");

addButton.addEventListener("click", function () {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let text = document.createTextNode(`♥  ${todoInput.value}`);
    let input = document.createElement("input");

    chrome.storage.local.set({ todo: "TODO" }, function () {
        console.log("Todo is set to ", text);
    });

    p.classList.add("todo");
    div.classList.add("todobox");
    input.classList.add("checkbox");
    input.setAttribute("type", "checkbox");

    p.appendChild(text);
    div.appendChild(p);
    div.appendChild(input);
    if (todoInput.value !== "") {
        todoswrapper.appendChild(div);
        todoInput.value = "";
    }
});

let clearButton = document.querySelector("#clearbutton");
clearButton.addEventListener("click", function () {
    console.log("REMOVE");
    todoswrapper.innerHTML = "";
    counter = 0;
    todoInput.value = "";
});

//================LOCAL STORAGE=========================================

window.onload = function () {
    chrome.storage.local.get(["key"], function (result) {
        console.log("Value currently is ", result);
    });
};
// let value = "FIRST TODO";
// chrome.storage.sync.set({ key: "TODO" }, function () {
//     console.log("Value is set to " + value);
// });

// chrome.storage.sync.get(["key"], function (result) {
//     console.log("Value currently is " + result.key);
// });
// let value = "FIRST TODO";
// chrome.storage.local.set({ todo: value }, function () {
//     console.log("Value is set to " + value);
// });

// chrome.storage.local.get(["key"], function (result) {
//     console.log("Value currently is " + result.key);
// });
