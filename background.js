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

const sounds = {
    tree: treeSound,
    fire: fireSound,
    leave: leaveSound,
    note: whiteNoise,
    rain: rainSound,
    water: waterSound,
};

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

//===================GET PLAYING SOUNDS =============================
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request !== "getPlayingSounds") {
        return;
    }
    const playing = Object.entries(sounds)
        .filter(([key, sound]) => !sound.paused)
        .map(([key]) => key);

    sendResponse(playing);
});
//===================PAUSE PLAY SOUND =============================
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("REQUEST: ", request);
    if (!request.sound) {
        return;
    }

    const soundToPlay = sounds[request.sound];

    if (!soundToPlay) {
        return;
    }
    if (soundToPlay.paused) {
        console.log(`BG ${request.sound} PLAYING`);
        soundToPlay.play();
    } else {
        soundToPlay.pause();
        console.log(`BG ${request.sound} PAUSE`);
        soundToPlay.currentTime = 0;
    }
});

//===================ADJUST VOLUME =============================
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

let startingTime = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request !== "startTimer") {
        return;
    }
    startingTime = new Date();
    console.log("STARING TIME", startingTime);
    sendResponse(startingTime);
});
