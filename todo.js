var temp;
var url;
var input;
var des;
var lat, lon;
var api = "http://api.openweathermap.org/data/2.5/weather?lat=";
var apiKey = "&appid=6e68ea4e907b436ecd6c9133a34a9f9f&units=metric";
function get_todos() {
    var todos = new Array();
    var todos_str = localStorage.getItem("todo");
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}


function add() {
    var audio = new Audio("button.mp3");
    audio.play();
    var task = document.getElementById("task").value;
    if (task == "") {
        document.getElementById("task").focus();
        return;
    }
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem("todo", JSON.stringify(todos));
    show();
    document.getElementById("task").value = null;
    document.getElementById("task").focus();

    return false;
}
function removee() {
    var audio = new Audio("pencil.wav");
    audio.play();
    var id = this.getAttribute("id");
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem("todo", JSON.stringify(todos));
    show();
    return false;
}





function show() {
    var todos = get_todos();
    l1 = todos.length;
    document.getElementById("title").style.color = titleColor;
    document.getElementById("add").style.color = titleColor;
    document.getElementById("task").style.color = titleColor;
    document.getElementById("todos").style.color = fontColor;
    var html = "<ul>";
    for (var i = 0; i < todos.length; i++) {
        html +=
            "<li>" +
            "   " +
            '<input type = "checkbox" class="removee" id="' +
            i +
            '"></input>' +
            todos[i] +
            "</li>";
    }
    html += "</ul>";
    chrome.browserAction.setBadgeText({ text: todos.length.toString() });
    document.getElementById("todos").innerHTML = html;
    var buttons = document.getElementsByClassName("removee");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", removee);
    }
}

document.getElementById("task").addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("add").click();
    }
});
document.getElementById("add").addEventListener("click", add);
get_color();
document.getElementById("redd").addEventListener("click", redcolorChange);
document.getElementById("greenn").addEventListener("click", greencolorChange);
document.getElementById("bluee").addEventListener("click", bluecolorChange);
document.getElementById("yellow").addEventListener("click", yellowcolorChange);
document.getElementById("pink").addEventListener("click", pinkcolorChange);
document.getElementById("cyan").addEventListener("click", cyancolorChange);
get_fontColor();
document.getElementById("fcolor").addEventListener("click", blackFont);
document.getElementById("wcolor").addEventListener("click", whiteFont);
document.getElementById("gcolor").addEventListener("click", greyFont);
document.getElementById("mot").addEventListener("click", motivation);
var date = new Date();
document.getElementById("date").innerHTML = date.toDateString();
show();
