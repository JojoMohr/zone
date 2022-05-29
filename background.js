//============SERVICE WORKER ===========================================
chrome.runtime.onInstalled.addListener(() => {
    console.log("This is coming from BG script");
});

//======================================================

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
//======================================================

//  SOUNDS /////////////////////////////////////
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

////===================MUTE =============================
var buttonClicked = false;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log("REQUEST MUTE: ", request);
    if (request == "mute") {
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
    }
});
//===================PAUSE PLAY SOUND =============================
var soundPlaying = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log("REQUEST: ", request);
    if (request.sound != "tree") return;

    if (request.sound == "tree" && treeSound.paused) {
        console.log("BG  TREE PLAYING");
        treeSound.play();
    } else {
        treeSound.pause();
        console.log("BG  TREE PAUSE");
        treeSound.currentTime = 0;
    }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.sound != "fire") return;

    if (request.sound == "fire" && fireSound.paused) {
        fireSound.play();
        console.log("BG  FIRE PLAYING");
    } else {
        fireSound.pause();
        fireSound.currentTime = 0;
    }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.sound != "leave") return;

    if (request.sound == "leave" && leaveSound.paused) {
        leaveSound.play();
        console.log("BG  leave PLAYING");
    } else {
        leaveSound.pause();
        leaveSound.currentTime = 0;
    }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.sound != "note") return;

    if (request.sound == "note" && whiteNoise.paused) {
        whiteNoise.play();
        console.log("BG  whiteNoise PLAYING");
    } else {
        whiteNoise.pause();
        whiteNoise.currentTime = 0;
    }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.sound != "rain") return;

    if (request.sound == "rain" && rainSound.paused) {
        rainSound.play();
        console.log("BG  rain PLAYING");
    } else {
        rainSound.pause();
        rainSound.currentTime = 0;
    }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.sound != "water") return;

    if (request.sound == "water" && waterSound.paused) {
        waterSound.play();
        console.log("BG  water PLAYING");
    } else {
        waterSound.pause();
        waterSound.currentTime = 0;
    }
});

// ADJUST VOLUME //////////////////////////////
let volTree = document.querySelector("#volTree");
let volFire = document.querySelector("#volFire");
let volWhite = document.querySelector("#volWhite");
let volLeave = document.querySelector("#volLeave");
let volRain = document.querySelector("#volRain");
let volWater = document.querySelector("#volWater");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("REQ", request);
    // console.log("THIS ID", request.singleSlider);
    if (request.singleSlider == "volTree") {
        treeSound.volume = request.setVol;
        console.log("RESPONSE IN CHANGE VOL", request);
    }
    if (request.singleSlider == "volFire") {
        fireSound.volume = request.setVol;
        console.log("RESPONSE IN CHANGE VOL", request);
    }
    if (request.singleSlider == "volWhite") {
        whiteNoise.volume = request.setVol;
        console.log("RESPONSE IN CHANGE VOL", request);
    }
    if (request.singleSlider == "volLeave") {
        leaveSound.volume = request.setVol;
        console.log("RESPONSE IN CHANGE VOL", request);
    }
    if (request.singleSlider == "volRain") {
        rainSound.volume = request.setVol;
        console.log("RESPONSE IN CHANGE VOL", request);
    }
    if (request.singleSlider == "volWater") {
        waterSound.volume = request.setVol;
        console.log("RESPONSE IN CHANGE VOL", request);
    }
});


