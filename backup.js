console.log("POPUP IS LOOGGING");
chrome.storage.local.get(["todo"], function (text) {
    console.log("Todo currently is ", text);
});

localStorage.setItem("TESTODO", "grey");
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

tree.addEventListener("click", function () {
    console.log("CLICK ON TREE");
    tree.classList.toggle("active");
});

// tree.addEventListener("click", function () {
//     console.log("CLICK ON TREE");
//     let active = fale;
//     let toogleActive = (active) => (active = !active);
//     toogleActive();
//     if (active) {
//         tree.className.add("active");
//     } else {
//         tree.className.remove("active");
//     }
// });

////===================MUTE =============================

mute.addEventListener("click", function () {
    chrome.runtime.sendMessage("mute");
});

////===================PAUSE PLAY SOUND =============================

const buttons = document.querySelectorAll(".sound .icon");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        // console.log("THIS", this.id);
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
let allToDosInLocal = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];

console.log("AHAHAHA", allToDosInLocal);
// let allToDos = [];
//============= ADD TODO ON ENTER =========================
todoInput.addEventListener("keydown", function (e) {
    let div = createTodoElement(todoInput.value);
    if (e.keyCode === 13 && todoInput.value !== "") {
        let allToDos = [...allToDosInLocal, todoInput.value];
        console.log("allToDos:", allToDos);
        localStorage.setItem("todo", JSON.stringify(allToDos));
        console.log("allToDos:", allToDos);

        todoswrapper.appendChild(div);
        todoInput.value = "";
    }
});
//==============ADD BUTTON =============================
let addButton = document.querySelector("#addbutton");

addButton.addEventListener("click", function () {
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
    if (todoInput.value !== "") {
        todoswrapper.appendChild(div);
        todoInput.value = "";
    }
});

//==============DELETE BUTTON =============================

let clearButton = document.querySelector("#clearbutton");
clearButton.addEventListener("click", function () {
    console.log("REMOVE");
    todoswrapper.innerHTML = "";
    todoInput.value = "";
});

//================================================================
function showTodos() {
    chrome.browserAction.setBadgeText({
        text: allToDosInLocal.length.toString(),
    });

    for (let i = 0; i < allToDosInLocal.length; i++) {
        let div = createTodoElement(allToDosInLocal[i]);
        todoswrapper.appendChild(div);
        div.lastChild.addEventListener("click", function (e) {
            setTimeout(() => {
                e.target.parentNode.remove();
            }, 500);

            // allToDos.splice(allToDosInLocal[i], 1);
            // localStorage.setItem("todo", JSON.stringify(allToDos));
            console.log("CLICKED ON CHECKBOC");
        });
        console.log("DIV", div.lastChild);
    }
}
showTodos();

//==============REMOVE ON CHECKBBOX=============================
// function removeOnChecked(event) {
//     if (event.target.checked)
//         allToDos = allToDos.filter((item) => item != event);
// }
//================LOCAL STORAGE=========================================
