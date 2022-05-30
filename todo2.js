var render = function () {
    chrome.storage.sync.get("tasks", function (obj) {
        var items = obj.tasks ? obj.tasks : new Array();
        if (items.length > 0) {
            todoList = "";
            for (var i = 0; i < items.length; i++) {
                todoList +=
                    "<div class='task-item-div'><input class='task-checkbox' type='checkbox'><span class='task-item'>" +
                    items[i] +
                    "</span></div>";
            }
            $(".tasks-list").html(todoList);
            chrome.browserAction.setBadgeText({
                text: items.length.toString(),
            });
        }
    });
};

$(document).ready(function () {
    render();

    $(".todo-form").submit(function (e) {
        e.preventDefault();
        if (
            !$.trim($(this).find(".task").val()) ||
            $.trim($(this).find(".task").val()) == "Add a task..."
        ) {
            $(".todo-form").before(
                "<span class='error'>You can't add a blank task. :)</span>"
            );
            $(".error").fadeOut(3000);
        } else {
            var task = $(this).find(".task").val();
            chrome.storage.sync.get("tasks", function (obj) {
                var tasks = obj.tasks ? obj.tasks : new Array();
                tasks.push(task);
                chrome.storage.sync.set({ tasks: tasks }, function () {
                    var taskItemDiv =
                        "<div class='task-item-div'><input class='task-checkbox' type='checkbox'><span class='task-item'>" +
                        task +
                        "</span></div>";
                    $(".tasks-list").append(taskItemDiv);
                    $(".task").val("");
                    $(".task").focus();
                    chrome.browserAction.setBadgeText({
                        text: tasks.length.toString(),
                    });
                });
            });
        }
    });

    $(".task").val("Add a task...");

    var text = "Add a task...";

    $(".task").focus(function () {
        $(this).siblings(".add-task-button").show();
        $(this).addClass("active");
        if ($(this).val() == text) $(this).val("");
    });

    $(".task").blur(function () {
        $(this).removeClass("active");
        if ($(this).val() == "") $(this).val(text);
    });

    $(".task-checkbox").live("click", function () {
        if ($(this).is(":checked")) {
            var el = $(this);
            var task = el.next(".task-item").html();
            chrome.storage.sync.get("tasks", function (obj) {
                var tasks = obj.tasks;
                var index = tasks.indexOf(task);
                if (index != -1) {
                    tasks.splice(index, 1);
                }
                chrome.storage.sync.set({ tasks: tasks }, function () {
                    el.next(".task-item").css(
                        "text-decoration",
                        "line-through"
                    );
                    el.parent().fadeOut(2000);
                    chrome.browserAction.setBadgeText({
                        text: tasks.length.toString(),
                    });
                });
            });
        }
    });

    $(".task-item").live("click", function () {
        var oldTask = $(this).html();
        $(this).editable(
            function (value, settings) {
                chrome.storage.sync.get("tasks", function (obj) {
                    var tasks = obj.tasks;
                    var index = tasks.indexOf(oldTask);
                    if (index != -1) {
                        tasks[index] = value;
                    }
                    chrome.storage.sync.set({ tasks: tasks });
                });
                return value;
            },
            {
                onblur: "submit",
                width: "192px",
                height: "15px",
            }
        );
    });
});
