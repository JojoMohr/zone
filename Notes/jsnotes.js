//== TRACK URL =================================
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
//     }
//     console.log("URL READER IS WORKING");
// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
//         chrome.scripting
//             .executeScript({
//                 target: { tabId: tabId },
//                 files: ["./foreground.js"],
//             })
//             .then(() => {
//                 console.log("INJECTED THE FOREGROUND SCRIPT.");
//             })
//             .catch((err) => console.log(err));
//     }
// });

// Notice the 'if' clause. If the web page the user is viewing
// is fully loaded(complete) AND it's an actual web page(http),
// then we do something.

///=========SETTING LOCAL STORAGE================================================

// chrome.storage.local.set({
//     name: "audio"
// }, function ());

// getting state
// chrome.storage.local.get("name", function (retrieved_data));

//========PLAY AUDIO IN BACKGROUND==============================================

// setTimeout(() => {
//     ping(serviceWorker);
// }, 1000);

// chrome.action.onClicked.addListener((tab) => {
//     executeScript(tab);

//     let origin = new URL(tab.url).origin;
//     logExtensionInvocation(origin);
//     if (shouldPromtForAutorun(origin)) {
//         requestPermission(origin);
//     }
// });
