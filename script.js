document.addEventListener("DOMContentLoaded", () => {
    const todoListInput = document.querySelector(".todo-list-input");
    const todoListAddBtn = document.querySelector(".todo-list-add-btn");
    const todoList = document.querySelector(".todo-list");

    // Add a task
    const addTask = () => {
        const taskText = todoListInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="form-check">
                <label class="form-check-label">
                    <input class="checkbox" type="checkbox"> ${taskText}
                    <i class="input-helper"></i>
                </label>
            </div>
            <i class="edit mdi mdi-pencil-outline" title="Edit Task"></i>
            <i class="remove mdi mdi-close-circle-outline" title="Delete Task"></i>
        `;
        todoList.appendChild(li);
        todoListInput.value = "";
    };

    // Edit a task
    const editTask = (taskItem) => {
        const taskLabel = taskItem.querySelector(".form-check-label");
        const currentText = taskLabel.textContent.trim();

        // Prompt the user to enter the new text
        const newText = prompt("Edit your task:", currentText);
        if (newText !== null && newText.trim() !== "") {
            taskLabel.innerHTML = `
                <input class="checkbox" type="checkbox"> ${newText}
                <i class="input-helper"></i>
            `;
        }
    };

    // Delete a task
    const deleteTask = (taskItem) => {
        todoList.removeChild(taskItem);
    };

    // Add task event
    todoListAddBtn.addEventListener("click", addTask);

    // Event delegation for edit and delete actions
    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove")) {
            deleteTask(e.target.parentElement);
        } else if (e.target.classList.contains("edit")) {
            editTask(e.target.parentElement);
        }
    });

    // Toggle task completion
    todoList.addEventListener("change", (e) => {
        if (e.target.classList.contains("checkbox")) {
            const taskItem = e.target.closest("li");
            taskItem.classList.toggle("completed");
        }
    });
});