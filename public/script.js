// Reference the task list container
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task-button");

// Reference the completed task list container
const completedTaskList = document.getElementById("completed-task-list");

// Array to store the tasks
let tasks = [];

// Load tasks from local storage on page load
function loadTasks() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task.title, task.content, task.date);
    taskElement.querySelector(".completed-checkbox").checked = task.completed;
    if (task.completed) {
      moveToCompletedTasks(taskElement);
    } else {
      taskList.appendChild(taskElement);
    }
  });
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create a task element
function createTaskElement(title, content, date) {
  // Task container
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  // Action buttons container (top of the task item)
  const taskActionsTop = document.createElement("div");
  taskActionsTop.className = "task-actions-top";

  // Completed checkbox
  const completedCheckbox = document.createElement("input");
  completedCheckbox.type = "checkbox";
  completedCheckbox.className = "completed-checkbox";
  completedCheckbox.id = `checkbox-${Date.now()}`; // Unique ID
  completedCheckbox.addEventListener("change", () =>
    toggleTaskCompletion(taskItem, completedCheckbox)
  );

  const completedCheckboxLabel = document.createElement("label");
  completedCheckboxLabel.className = "completed-checkbox-label";
  completedCheckboxLabel.textContent = "Mark as Complete";
  completedCheckboxLabel.htmlFor = completedCheckbox.id;

  // Edit button
  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () =>
    editTask(taskItem, title, content, date)
  );

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(taskItem));

  // Append action buttons to the top container
  taskActionsTop.appendChild(completedCheckbox);
  taskActionsTop.appendChild(completedCheckboxLabel);
  taskActionsTop.appendChild(editButton);
  taskActionsTop.appendChild(deleteButton);

  // Task details
  const taskDetails = document.createElement("div");
  taskDetails.className = "task-details";

  const taskHeading = document.createElement("h3");
  taskHeading.textContent = title;

  const taskDate = document.createElement("span");
  taskDate.className = "task-date";
  taskDate.textContent = `Date: ${date}`;

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";
  taskContent.textContent = content;

  taskDetails.appendChild(taskHeading);
  taskDetails.appendChild(taskDate);
  taskDetails.appendChild(taskContent);

  // Append the top actions and details to the task item
  taskItem.appendChild(taskActionsTop);
  taskItem.appendChild(taskDetails);

  return taskItem;
}

// Function to add a task
function addTask() {
  const title = document.getElementById("task-title").value;
  const content = document.getElementById("task-content").value;
  const date = document.getElementById("task-date").value;

  if (title.trim() === "" || content.trim() === "" || date === "") {
    alert("Please fill out all fields!");
    return;
  }

  const task = createTaskElement(title, content, date);
  taskList.appendChild(task);

  // Clear input fields
  document.getElementById("task-title").value = "";
  document.getElementById("task-content").value = "";
  document.getElementById("task-date").value = "";

  tasks.push({ title, content, date, completed: false });
  saveTasks();
}

// Function to delete a task
function deleteTask(taskElement) {
  if (confirm("Are you sure you want to delete this task?")) {
    const title = taskElement.querySelector("h3").textContent;
    const content = taskElement.querySelector(".task-content").textContent;
    const date = taskElement
      .querySelector(".task-date")
      .textContent.replace("Date: ", "");
    const taskIndex = tasks.findIndex(
      (t) => t.title === title && t.content === content && t.date === date
    );
    tasks.splice(taskIndex, 1);
    taskElement.parentElement.removeChild(taskElement);
    saveTasks();
  }
}

// Function to toggle task completion
function toggleTaskCompletion(taskElement, checkbox) {
  const parentList = checkbox.checked ? completedTaskList : taskList;
  if (taskElement.parentElement) {
    taskElement.parentElement.removeChild(taskElement);
  }
  parentList.appendChild(taskElement);
  taskElement.querySelector("h3").style.textDecoration = checkbox.checked
    ? "line-through"
    : "none";

  const title = taskElement.querySelector("h3").textContent;
  const content = taskElement.querySelector(".task-content").textContent;
  const date = taskElement
    .querySelector(".task-date")
    .textContent.replace("Date: ", "");
  const taskIndex = tasks.findIndex(
    (t) => t.title === title && t.content === content && t.date === date
  );
  tasks[taskIndex].completed = checkbox.checked;
  saveTasks();
}

// Function to edit a task
function editTask(taskElement, oldTitle, oldContent, oldDate) {
  const parentList = taskElement.parentElement;

  // Create an editable form
  const editForm = document.createElement("form");
  editForm.classList.add("edit-form");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = oldTitle;

  const contentInput = document.createElement("textarea");
  contentInput.value = oldContent;

  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = oldDate;

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    parentList.replaceChild(taskElement, editForm);
  });

  editForm.appendChild(titleInput);
  editForm.appendChild(contentInput);
  editForm.appendChild(dateInput);
  editForm.appendChild(saveButton);
  editForm.appendChild(cancelButton);

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTitle = titleInput.value;
    const newContent = contentInput.value;
    const newDate = dateInput.value;
    const updatedTask = createTaskElement(newTitle, newContent, newDate);
    parentList.replaceChild(updatedTask, editForm);

    const taskIndex = tasks.findIndex(
      (t) =>
        t.title === oldTitle && t.content === oldContent && t.date === oldDate
    );
    tasks[taskIndex] = {
      title: newTitle,
      content: newContent,
      date: newDate,
      completed: tasks[taskIndex].completed,
    };
    saveTasks();
  });

  parentList.replaceChild(editForm, taskElement);
}

// Event listener for the add button
addTaskButton.addEventListener("click", addTask);

// Load tasks from local storage on page load
loadTasks();
