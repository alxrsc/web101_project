function createDiv(event) {
    if (event.keyCode === 13) {
        var textInput = document.getElementById("toBeDone");
        var text = textInput.value.trim();
        if (text !== "") {
            var container = document.getElementById("resultDiv");
            var div = document.createElement("div");
            div.classList.add("tasks");

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "radio";

            var checkmark = document.createElement("span");
            checkmark.classList.add("checkmark");

            var label = document.createElement("label");
            label.classList.add("container");
            label.appendChild(checkbox);
            label.appendChild(checkmark);

            var inputBox = document.createElement("input");
            inputBox.type = "text";
            inputBox.value = text;
            inputBox.classList.add("taskInput");
            inputBox.readOnly = true;

            var deleteButton = document.createElement("button");
            deleteButton.classList.add("deleteButton");
            deleteButton.textContent = "x";
            deleteButton.addEventListener("click", function() {
                container.removeChild(div);
                updateTaskCounter();
                updateClearCompletedButton();
            });

            var editButton = document.createElement("button");
            editButton.classList.add("editButton");
            editButton.textContent = "Edit Task";
            editButton.addEventListener("click", function() {
                if (inputBox.readOnly) {
                    inputBox.readOnly = false;
                    inputBox.focus();
                    editButton.textContent = "Save";
                } else {
                    inputBox.readOnly = true;
                    editButton.textContent = "Edit Task";
                }
            });

            div.appendChild(label);
            div.appendChild(inputBox);
            div.appendChild(editButton);
            div.appendChild(deleteButton);
            container.appendChild(div);
            textInput.value = "";

            div.setAttribute("data-status", "active");

            checkbox.addEventListener("change", function() {
                var status = this.checked ? "completed" : "active";
                div.setAttribute("data-status", status);
                updateTaskCounter();
                updateClearCompletedButton();
                inputBox.classList.toggle("completed", this.checked);// Toggle completed class based on checkbox state


                var activeButton = document.getElementById("activeButton");
                var completedButton = document.getElementById("completedButton");
                var allButton = document.getElementById("allButton");

                if (allButton.classList.contains("active")) {
                    return;
                }

                if (activeButton.classList.contains("active") && status === "completed") {
                    div.style.display = "none";
                    return;
                }

                if (completedButton.classList.contains("active") && status === "active") {
                    div.style.display = "none";
                    return;
                }

                if (activeButton.classList.contains("active") && this.checked) {
                    div.style.display = "none";
                    return;
                }
            });

            var activeButton = document.getElementById("activeButton");
            if (activeButton.classList.contains("active") && checkbox.checked) {
                div.style.display = "none";
            }

            updateTaskCounter();
        }
    }
}

function filterTasks(status) {
    var tasks = document.querySelectorAll(".tasks");
    tasks.forEach(function(task) {
        var taskStatus = task.getAttribute("data-status");
        if (status === "all" || taskStatus === status) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

function updateTaskCounter() {
    var tasks = document.querySelectorAll(".tasks");
    var activeTasks = Array.from(tasks).filter(task => task.getAttribute("data-status") === "active");
    var counter = document.getElementById("taskCounter");
    counter.textContent = `${activeTasks.length} tasks left`;
}

function updateClearCompletedButton() {
    var tasks = document.querySelectorAll(".tasks");
    var completedTasks = Array.from(tasks).filter(task => task.getAttribute("data-status") === "completed");
    var clearCompletedButton = document.getElementById("clearCompletedButton");
    clearCompletedButton.style.color = completedTasks.length > 0 ? "darkred" : "transparent";
}

function clearCompleted() {
    var tasks = document.querySelectorAll(".tasks");
    var container = document.getElementById("resultDiv");
    tasks.forEach(function(task) {
        if (task.getAttribute("data-status") === "completed") {
            container.removeChild(task);
        }
    });
    updateClearCompletedButton();
}

document.addEventListener("DOMContentLoaded", function() {
    var textInput = document.getElementById("toBeDone");
    textInput.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            createDiv(event);
        }
    });

    var activeButton = document.getElementById("activeButton");
    var completedButton = document.getElementById("completedButton");
    var allButton = document.getElementById("allButton");

    activeButton.addEventListener("click", function() {
        filterTasks("active");
        setActiveButton(this);
    });

    completedButton.addEventListener("click", function() {
        filterTasks("completed");
        setActiveButton(this);
    });

    allButton.addEventListener("click", function() {
        filterTasks("all");
        setActiveButton(this);
    });

    function setActiveButton(button) {
        var buttons = document.querySelectorAll(".taskButton");
        buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
    }

    updateTaskCounter();
    updateClearCompletedButton();
});
