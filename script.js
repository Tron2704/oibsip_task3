const toggleBtns = document.querySelectorAll(".theme-toggle");
const calculator = document.querySelector(".to-do");
let darkMode = true; // Using let as this variable will change

toggleBtns.forEach(toggleBtn => {
  toggleBtn.addEventListener("click", () => {
    calculator.classList.toggle("dark");
    toggleBtn.classList.toggle("present");
    darkMode = !darkMode;
  });
});

// ---------------------------------------------------------------------------------


function showCreate() {
    document.querySelector(".create").style.display = "block";
    document.querySelector(".pending").style.display = "none";
    document.querySelector(".completed").style.display = "none";
}

function showPending() {
    document.querySelector(".create").style.display = "none";
    document.querySelector(".pending").style.display = "block";
    document.querySelector(".completed").style.display = "none";
}

function showCompleted() {
    document.querySelector(".create").style.display = "none";
    document.querySelector(".pending").style.display = "none";
    document.querySelector(".completed").style.display = "block";
}


// -----------------------------------------------------------------------------------

function showMessage(messageType) {
    const message = document.querySelector(`.${messageType}`);
    message.style.display = "block";
    message.classList.add("fade-in");
    setTimeout(() => {
        message.classList.remove("fade-in");
        message.classList.add("fade-out");
        setTimeout(() => {
            message.style.display = "none";
            message.classList.remove("fade-out");
        }, 2000);
    }, 1000);
}

// ------------------------------------------------------------------------------------


let tasks = [];

window.addEventListener('load', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toLocaleString(),
        };

        tasks.push(newTask);
        taskInput.value = "";
        displayTasks();
        showMessage('addmessage');
        saveTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    displayTasks();
    saveTasks();
    showMessage('deletemessage');
}

function completeTask(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        tasks[taskIndex].completedAt = new Date().toLocaleString(); // Capture completion time
        displayTasks();
        saveTasks();
        showMessage('completemessage');
    }
}

function deleteCompletedTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    displayTasks();
    saveTasks();
    showMessage('deletemessage');
}

function displayTasks() {
    const pendingTasksTable = document.getElementById("pendingTasks");
    const completedTasksTable = document.getElementById("completedTasks");

    pendingTasksTable.innerHTML = "";
    completedTasksTable.innerHTML = "";

    tasks.forEach((task) => {
        const row = document.createElement("tr");

        const cellTitle = document.createElement("td");
        cellTitle.textContent = task.text;

        const cellCreatedAt = document.createElement("td");
        cellCreatedAt.textContent = task.createdAt;

        if (task.completed) {
            const cellCompletedAt = document.createElement("td");
            cellCompletedAt.textContent = task.completedAt;

            const cellDeleteButton = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete");
            deleteButton.onclick = () => deleteCompletedTask(task.id);
            cellDeleteButton.appendChild(deleteButton);

            row.appendChild(cellTitle);
            row.appendChild(cellCompletedAt);
            row.appendChild(cellDeleteButton);

            completedTasksTable.appendChild(row);
        } else {
            const cellCompleteButton = document.createElement("td");
            const completeButton = document.createElement("button");
            completeButton.textContent = "Complete";
            completeButton.classList.add("complete");
            completeButton.onclick = () => completeTask(task.id);
            cellCompleteButton.appendChild(completeButton);

            const cellDeleteButton = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete");
            deleteButton.onclick = () => deleteTask(task.id);
            cellDeleteButton.appendChild(deleteButton);

            row.appendChild(cellTitle);
            row.appendChild(cellCreatedAt);
            row.appendChild(cellCompleteButton);
            row.appendChild(cellDeleteButton);

            pendingTasksTable.appendChild(row);
        }
    });
}

displayTasks();







