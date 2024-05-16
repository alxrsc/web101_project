function createDiv(event) {
    if (event.keyCode === 13) { // Check if Enter key is pressed
        var textInput = document.getElementById("toBeDone");
        var text = textInput.value.trim(); // Get the trimmed value of the input
        if (text !== "") { // Check if input is not empty
            var container = document.getElementById("resultDiv");
            var div = document.createElement("div");
            div.classList.add("tasks"); // Add class "tasks" to the created div
            var label = document.createElement("label");
            label.classList.add("container"); // Add class "container" to the created label
            label.textContent = text;
            var input = document.createElement("input");
            input.type = "checkbox";
            input.name = "radio";
            var span = document.createElement("span");
            span.classList.add("checkmark"); // Add class "checkmark" to the created span
            label.appendChild(input);
            label.appendChild(span);
            div.appendChild(label);
            container.appendChild(div);
            textInput.value = ""; // Clear the input field

            // Add status attribute to the task
            div.setAttribute("data-status", "active");

            // Attach event listener to the checkbox to toggle task status
            input.addEventListener("change", function() {
                var activeButton = document.getElementById("activeButton");
                var completedButton = document.getElementById("completedButton");
                var allButton = document.getElementById("allButton");

                var status = this.checked ? "completed" : "active";

                // If the "All" button is active, don't change the display status
                if (allButton.classList.contains("active")) {
                    div.setAttribute("data-status", status);
                    return;
                }

                // If "Active" button is active and the task is completed, hide it
                if (activeButton.classList.contains("active") && status === "completed") {
                    div.style.display = "none";
                    return;
                }

                // If "Completed" button is active and the task is active, hide it
                if (completedButton.classList.contains("active") && status === "active") {
                    div.style.display = "none";
                    return;
                }

                // If the task is checked and "Active" button is active, hide it
                if (activeButton.classList.contains("active") && this.checked) {
                    div.style.display = "none";
                    return;
                }
            });

            // If the "Active" button is active when a new task is created and it's checked, hide it
            var activeButton = document.getElementById("activeButton");
            if (activeButton.classList.contains("active") && input.checked) {
                div.style.display = "none";
            }
        }
    }
}

// Function to filter tasks based on their status
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

document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to create a task when Enter key is pressed
    var textInput = document.getElementById("toBeDone");
    textInput.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) { // Check if Enter key is pressed
            createTask();
        }
    });

    // Function to create a task
    function createTask() {
        var textInput = document.getElementById("toBeDone");
        var text = textInput.value.trim(); // Get the trimmed value of the input
        if (text !== "") { // Check if input is not empty
            var container = document.getElementById("resultDiv");
            var div = document.createElement("div");
            div.classList.add("tasks"); // Add class "tasks" to the created div
            var label = document.createElement("label");
            label.classList.add("container"); // Add class "container" to the created label
            label.textContent = text;
            var input = document.createElement("input");
            input.type = "checkbox";
            input.name = "radio";
            var span = document.createElement("span");
            span.classList.add("checkmark"); // Add class "checkmark" to the created span
            label.appendChild(input);
            label.appendChild(span);
            div.appendChild(label);
            container.appendChild(div);
            textInput.value = ""; // Clear the input field

            // Add status attribute to the task
            div.setAttribute("data-status", "active");

            // Attach event listener to the checkbox to toggle task status
            input.addEventListener("change", function() {
                if (this.checked) {
                    div.setAttribute("data-status", "completed");
                    // Schedule hiding of completed task after 3 seconds
                    setTimeout(function() {
                        if (allButton.classList.contains("active")) {
                            div.style.display = "flex"; // Keep visible if "All" button is active
                        } else {
                            div.style.display = "none";
                        }
                    }, 3000);
                } else {
                    div.setAttribute("data-status", "active");
                    div.style.display = "flex"; // Ensure task is visible when toggled back to active
                }
            });
        }
    }

    // Attach event listeners to filter buttons
    var activeButton = document.getElementById("activeButton");
    var completedButton = document.getElementById("completedButton");
    var allButton = document.getElementById("allButton");

    activeButton.addEventListener("click", function() {
        filterTasks("active");
        setActiveButton(this); // Call function to set active button
    });

    completedButton.addEventListener("click", function() {
        filterTasks("completed");
        setActiveButton(this); // Call function to set active button
    });

    allButton.addEventListener("click", function() {
        filterTasks("all");
        setActiveButton(this); // Call function to set active button
    });

    // Function to set the active button
    function setActiveButton(button) {
        // Remove active class from all buttons
        var buttons = document.querySelectorAll(".taskButton");
        buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        // Add active class to the clicked button
        button.classList.add("active");
    }

    // Function to filter tasks based on their status
    function filterTasks(status) {
        var tasks = document.querySelectorAll(".tasks");
        tasks.forEach(function(task) {
            var taskStatus = task.getAttribute("data-status");
            if (status === "all" || (status === "active" && taskStatus !== "completed")) {
                task.style.display = "flex";
            } else {
                task.style.display = taskStatus === status ? "flex" : "none";
            }
        });
    }
});
