(function () {
    let ls = JSON.parse(localStorage.getItem("todos")) || [];

    const todoContainer = document.getElementById("todo");
    const tasks = document.getElementById("tasks");

    const addButton = document.createElement("button");
    addButton.textContent = "Add Todo";

    const toDoInput = document.createElement("input");
    toDoInput.type = "text";
    toDoInput.placeholder = "Enter a new todo item";

    todoContainer.appendChild(toDoInput);
    todoContainer.appendChild(addButton);

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(ls));
    }

    function createTodo(todo) {
        const task = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = todo.text;

        if (todo.completed) {
            taskText.classList.add("completed");
            taskText.style.color = "gray";
        }

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        const completedButton = document.createElement("button");
        completedButton.textContent = "Completed";

        editButton.addEventListener("click", () => {
            if (editButton.textContent === "Edit") {
                if (taskText.classList.contains("completed")) {
                    taskText.classList.remove("completed");
                    taskText.style.color = "";

                    todo.completed = false;
                    saveTodos();
                }

                const input = document.createElement("input");
                input.type = "text";
                input.value = taskText.textContent;

                task.replaceChild(input, taskText);
                input.focus();
                editButton.textContent = "Save";
            } else {
                const input = task.querySelector("input");
                const updatedText = input.value.trim();

                if (updatedText !== "") {
                    taskText.textContent = updatedText;
                    todo.text = updatedText;
                    saveTodos();
                }

                task.replaceChild(taskText, input);
                editButton.textContent = "Edit";
            }
        });

        deleteButton.addEventListener("click", () => {
            ls = ls.filter(t => t !== todo);
            saveTodos();
            task.remove();
        });

        completedButton.addEventListener("click", () => {
            taskText.classList.add("completed");
            taskText.style.color = "gray";

            todo.completed = true;
            saveTodos();
        });

        task.appendChild(taskText);
        task.appendChild(editButton);
        task.appendChild(deleteButton);
        task.appendChild(completedButton);

        tasks.prepend(task);
    }

    function addTodo() {
        const todoItem = toDoInput.value.trim();

        if (todoItem === "") return;

        const todo = {
            text: todoItem,
            completed: false
        };

        ls.push(todo);
        saveTodos();

        createTodo(todo);

        toDoInput.value = "";
    }

    ls.forEach(todo => createTodo(todo));

    addButton.addEventListener("click", addTodo);

    toDoInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    });
})();