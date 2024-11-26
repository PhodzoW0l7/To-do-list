// Reference the task list container
const taskList = document.getElementById("task-list");
const addTaskButton = document.getElementById("add-task-button");

// Function to create a task element
function createTaskElement(title, content, date) {
  // Task container
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  // Completed checkbox
  const completedCheckboxContainer = document.createElement("div");
  completedCheckboxContainer.className = "completed-checkbox-container";

  const completedCheckbox = document.createElement("input");
  completedCheckbox.type = "checkbox";
  completedCheckbox.className = "completed-checkbox";
  completedCheckbox.addEventListener("change", () =>
    toggleTaskCompletion(taskItem, completedCheckbox)
  );

  const completedCheckboxLabel = document.createElement("label");
  completedCheckboxLabel.className = "completed-checkbox-label";
  completedCheckboxLabel.textContent = "Mark as complete";
  completedCheckboxLabel.htmlFor = completedCheckbox.id;

  completedCheckboxContainer.appendChild(completedCheckbox);
  completedCheckboxContainer.appendChild(completedCheckboxLabel);

  // Task details
  const taskDetails = document.createElement("div");
  const taskHeading = document.createElement("h3");
  taskHeading.textContent = title;
  const taskDate = document.createElement("span");
  taskDate.className = "task-date";
  taskDate.textContent = `Date: ${date}`;
  const taskContent = document.createElement("div");
  taskContent.className = "task-content";
  taskContent.textContent = content;

  taskDetails.appendChild(completedCheckboxContainer);
  taskDetails.appendChild(taskHeading);
  taskDetails.appendChild(taskDate);
  taskDetails.appendChild(taskContent);

  // Action buttons
  const taskActions = document.createElement("div");
  taskActions.className = "actions";
  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () =>
    editTask(taskItem, title, content, date)
  );
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(taskItem));

  taskActions.appendChild(editButton);
  taskActions.appendChild(deleteButton);

  // Append details and actions to task item
  taskItem.appendChild(taskDetails);
  taskItem.appendChild(taskActions);

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
}

// Function to delete a task
function deleteTask(taskElement) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskList.removeChild(taskElement);
  }
}

// Function to toggle task completion
function toggleTaskCompletion(taskElement, checkbox) {
  taskElement.classList.toggle("completed");
  if (checkbox.checked) {
    taskElement.querySelector("h3").style.textDecoration = "line-through";
  } else {
    taskElement.querySelector("h3").style.textDecoration = "none";
  }
}

// Function to edit a task
function editTask(taskElement, oldTitle, oldContent, oldDate) {
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
    taskList.replaceChild(taskElement, editForm);
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
    taskList.replaceChild(updatedTask, editForm);
  });

  taskList.replaceChild(editForm, taskElement);
}

// Event listener for the add button
addTaskButton.addEventListener("click", addTask);

// Reference the completed task list container
const completedTaskList = document.getElementById("completed-task-list");

// Function to move a task to the completed tasks section
function moveToCompletedTasks(taskElement) {
  completedTaskList.appendChild(taskElement);
  taskElement.querySelector("h3").style.textDecoration = "line-through";
}

// Modify the toggleTaskCompletion function
function toggleTaskCompletion(taskElement, checkbox) {
  taskElement.classList.toggle("completed");
  if (checkbox.checked) {
    moveToCompletedTasks(taskElement);
  } else {
    taskList.appendChild(taskElement);
    taskElement.querySelector("h3").style.textDecoration = "none";
  }
}
