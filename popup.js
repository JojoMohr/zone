console.log("POPUP IS LOOGGING");
chrome.storage.local.get(["todo"], function (text) {
    console.log("Todo currently is ", text);
});

let mute = document.querySelector("#mute");

let right = document.querySelector("#right");
let tree = document.querySelector("#tree");
let fire = document.querySelector("#fire");
let white = document.querySelector("#note");
let leave = document.querySelector("#leave");
let rain = document.querySelector("#rain");
let water = document.querySelector("#water");

//==
let soundgrid = document.querySelector(".soundgrid");
let slide2 = document.querySelector(".slide2");
let slides = document.querySelector(".slides");
let timer = document.querySelector("#timer");
let dot1 = document.querySelector("#dot1");
let dot2 = document.querySelector("#dot2");
// let dot3 = document.querySelector("#dot3");

// tree.addEventListener("click", function () {
//     console.log("CLICK ON TREE");
//     tree.classList.toggle("active");
// });

//=============== TIMER //===============//===============
function startTimer(duration, display) {
    var timer = duration,
        minutes,
        seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function startTimerOnClick() {
    var twentyFiveMinutes = 60 * 25,
        display = document.querySelector("#timer");
    startTimer(twentyFiveMinutes, display);
}

////===================MUTE =============================

mute.addEventListener("click", function () {
    chrome.runtime.sendMessage("mute");
});
timer.addEventListener("click", function () {
    console.log("CLICK ON TIMER");
    startTimerOnClick();
    chrome.runtime.sendMessage("timer");
});

////===================PAUSE PLAY SOUND =============================

const buttons = document.querySelectorAll(".sound .icon");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        // console.log("THIS", this.id);
        button.classList.toggle("active");

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

/////// /////// /////// /////// /////// /////// /////// ///////  //////
///////                          TODOLISTE                        /////
/////// /////// /////// /////// /////// /////// /////// /////// ///////

let todoInput = document.querySelector("#todoinput");
let todoswrapper = document.querySelector("#todoswrapper");

///========= GET TODOS =====================================

//==========================================================================
//=== TODOS ON PUPUOP=====
let checkbox;
function createTodoElement(todo) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let text = document.createTextNode(`♥  ${todo}`);
    checkbox = document.createElement("input");

    p.classList.add("todo");
    div.classList.add("todobox");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("type", "checkbox");

    p.appendChild(text);
    div.appendChild(p);
    div.appendChild(checkbox);
    return div;
}
//==========================================================================

//==========================================================================

let allToDos = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
// localStorage.setItem("todo", [allToDos]);

//============= ADD TODO ON ENTER =========================
todoInput.addEventListener("keydown", function (e) {
    let div = createTodoElement(todoInput.value);
    if (e.keyCode === 13 && todoInput.value !== "") {
        // let allToDos = getAllToDos();
        allToDos.push(todoInput.value);
        setBadge();
        localStorage.setItem("todo", JSON.stringify(allToDos));
        console.log("allToDos:", allToDos);
        todoswrapper.appendChild(div);
        todoInput.value = "";
        todoswrapper.appendChild(div);
        div.lastChild.addEventListener("click", function (e) {
            setBadge();

            setTimeout(() => {
                const index = [
                    ...e.target.parentElement.parentElement.children,
                ].indexOf(e.target.parentElement);
                e.target.parentNode.remove();
                allToDos.splice(index, 1);
                setBadge();
                localStorage.setItem("todo", JSON.stringify(allToDos));
            }, 500);
        });
    }
});
//==============ADD BUTTON =============================
let addButton = document.querySelector("#addbutton");

addButton.addEventListener("click", function () {
    let div = createTodoElement(todoInput.value);

    if (todoInput.value !== "") {
        // let allToDos = getAllToDos();
        allToDos.push(todoInput.value);
        setBadge();
        localStorage.setItem("todo", JSON.stringify(allToDos));
        console.log("allToDos:", allToDos);
        todoswrapper.appendChild(div);
        todoInput.value = "";
        todoswrapper.appendChild(div);
        div.lastChild.addEventListener("click", function (e) {
            setBadge();

            setTimeout(() => {
                const index = [
                    ...e.target.parentElement.parentElement.children,
                ].indexOf(e.target.parentElement);
                e.target.parentNode.remove();

                console.log("PETESTODOS", index);
                // console.log("E:TARGET", e.target);

                allToDos.splice(index, 1);
                setBadge();
                localStorage.setItem("todo", JSON.stringify(allToDos));
            }, 500);
        });
    }
});

//==============DELETE BUTTON =============================

let clearButton = document.querySelector("#clearbutton");
clearButton.addEventListener("click", function () {
    localStorage.setItem("todo", JSON.stringify([]));
    allToDos = [];
    setBadge();
    console.log("REMOVE");
    todoswrapper.innerHTML = "";
    todoInput.value = "";
});

//================================================================
function showTodos() {
    setBadge();

    for (let i = 0; i < allToDos.length; i++) {
        let div = createTodoElement(allToDos[i]);
        console.log("I 2", i);
        todoswrapper.appendChild(div);

        div.lastChild.addEventListener("click", function (e) {
            setTimeout(() => {
                e.target.parentNode.remove();
                allToDos.splice(i, 1);
                setBadge();
                localStorage.setItem("todo", JSON.stringify(allToDos));
            }, 500);
            console.log("I", i);
        });
        console.log("DIV", div.lastChild);
    }
}

showTodos();

function setBadge() {
    if (allToDos.length > 0) {
        chrome.browserAction.setBadgeText({
            text: allToDos.length.toString(),
        });
    } else {
        return;
    }
}
//==============REMOVE ON CHECKBBOX=============================
// function removeOnChecked(event) {
//     if (event.target.checked)
//         allToDos = allToDos.filter((item) => item != event);
// }
//================LOCAL STORAGE=========================================

window.onload = function () {
    chrome.runtime.sendMessage("getPlayingSounds", (playingSounds) => {
        // loop over the playing sounds and highlight elements accordingly
        console.log("getPlayingSounds", playingSounds);
        playingSounds.forEach((id) => {
            const button = document.getElementById(id);
            button.classList.toggle("active");
        });
    });
};
