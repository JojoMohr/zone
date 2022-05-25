// console.log("test");

(function () {
    let mute = document.querySelector("#mute");
    let right = document.querySelector("#right");
    // let close = document.querySelector("#close");
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

    // SOUNDS /////////////////////////////////////
    let treeSound = new Audio("sounds/rainforest-audio.mp3");
    let fireSound = new Audio("sounds/bonfire-audio.wav");
    let leaveSound = new Audio("sounds/morning-atmo.wav");
    let whiteNoise = new Audio("sounds/white-noise.wav");
    let rainSound = new Audio("sounds/rain-audio.mp3");
    let waterSound = new Audio("sounds/water-audio.mp3");

    let audio = [
        treeSound,
        fireSound,
        leaveSound,
        whiteNoise,
        rainSound,
        waterSound,
    ];

    //  LOOP SOUNDS ///////////////////////////////

    for (let i = 0; i < audio.length; i++) {
        audio[i].loop = true;
    }

    // ADJUST VOLUME //////////////////////////////
    let volTree = document.querySelector("#volTree");
    volTree.addEventListener("input", function (e) {
        treeSound.volume = e.currentTarget.value / 100;
    });

    let volFire = document.querySelector("#volFire");
    volFire.addEventListener("input", function (e) {
        fireSound.volume = e.currentTarget.value / 100;
    });

    let volWhite = document.querySelector("#volWhite");
    volWhite.addEventListener("input", function (e) {
        whiteNoise.volume = e.currentTarget.value / 100;
    });

    let volLeave = document.querySelector("#volLeave");
    volLeave.addEventListener("input", function (e) {
        leaveSound.volume = e.currentTarget.value / 100;
    });

    let volRain = document.querySelector("#volRain");
    volRain.addEventListener("input", function (e) {
        rainSound.volume = e.currentTarget.value / 100;
    });

    let volWater = document.querySelector("#volWater");
    volWater.addEventListener("input", function (e) {
        waterSound.volume = e.currentTarget.value / 100;
    });
    /////////// PAUSE PLAY SOUND ///////////

    var buttonClicked = false;
    mute.addEventListener("click", function () {
        if (buttonClicked === false) {
            for (let i = 0; i < audio.length; i++) {
                audio[i].volume = 0;
            }
            buttonClicked = true;
        } else if (buttonClicked === true) {
            for (let i = 0; i < audio.length; i++) {
                audio[i].volume = 0.5;
            }
            buttonClicked = false;
        }
    });

    // EVENT LISTENERS ////////////////////////////
    //// SOUNDS
    tree.addEventListener("click", function () {
        if (treeSound.paused) {
            treeSound.play();
            console.log("tree Plays");
        } else {
            treeSound.pause();
            console.log("tree stops");

            treeSound.currentTime = 0;
        }
    });

    fire.addEventListener("click", function () {
        if (fireSound.paused) {
            fireSound.play();
            console.log("fire Plays");
        } else {
            fireSound.pause();
            console.log("fire stop");
            fireSound.currentTime = 0;
        }
    });
    white.addEventListener("click", function () {
        if (whiteNoise.paused) {
            whiteNoise.play();
        } else {
            whiteNoise.pause();
            whiteNoise.currentTime = 0;
        }
    });
    leave.addEventListener("click", function () {
        if (leaveSound.paused) {
            leaveSound.play();
        } else {
            leaveSound.pause();
            leaveSound.currentTime = 0;
        }
    });
    rain.addEventListener("click", function () {
        if (rainSound.paused) {
            rainSound.play();
        } else {
            rainSound.pause();
            rainSound.currentTime = 0;
        }
    });
    water.addEventListener("click", function () {
        if (waterSound.paused) {
            waterSound.play();
        } else {
            waterSound.pause();
            waterSound.currentTime = 0;
        }
    });
    ////  NAVBAR

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

    // if (soundgrid.classList.contains("on")) {
    //     slide2.classList.add("off");
    // } else {
    //     slide2.classList.add("on");
    // }

    /////// TODOLISTE
    counter = 0;

    let todoInput = $("#todoinput");
    // let todoInput = document.querySelector("#todoinput");

    // let todoswrapper = $("#todoswrapper");

    let todoswrapper = document.querySelector("#todoswrapper");
    todoInput.on("keydown", function (e) {
        if (e.keyCode === 13 && todoInput.val() !== "") {
            // counter++;
            console.log(counter);
            if (counter <= 11) {
                todoswrapper.innerHTML += `<div class="todobox">
                    <p class="todo">♥  ${todoInput.val()} </p> 
                    <input class="checkbox" type="checkbox" />
                </div>`;
                todoInput.val("");
            } else {
                console.log("TO MANY TODOS");
                return;
            }
        }
    });

    let addButton = document.querySelector("#addbutton");

    addButton.addEventListener("click", function () {
        if (todoInput.val() !== "") {
            // counter++;
            console.log(counter);
            console.log("ADD");
            if (counter <= 11 || todoInput.val == "") {
                todoswrapper.innerHTML += `<div class="todobox">
            <p class="todo">♥  ${todoInput.val()} </p> 
           <input class="checkbox" type="checkbox" />
            </div>`;
                todoInput.val("");
            } else {
                console.log("TO MANY TODOS");
                return;
            }
        }
    });

    let clearButton = document.querySelector("#clearbutton");
    clearButton.addEventListener("click", function () {
        console.log("REMOVE");
        todoswrapper.innerHTML = "";
        counter = 0;
        todoInput.val("");
    });

    ////CHECKBOX
    // let checkbox = document.querySelector(".checkbox");
    // checkbox.addEventListener("change", function(e) {
    //     if (checkbox.checked) {
    //         e.target.console.log("Checkbox is checked..");
    //     } else {
    //         console.log("Checkbox is not checked..");
    //     }
    // });
})();
