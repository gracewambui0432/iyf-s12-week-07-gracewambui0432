
const STORAGE_KEY = "refactoredTodos";

const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("list");
const statusMessage = document.getElementById("status");

let todos = [];

function loadTodos() {
    try {
        const savedTodos = localStorage.getItem(STORAGE_KEY);

        const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];

        todos = Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch (error) {
        console.error("Could not load todos:", error);
        todos = [];
    }
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function addTodo(todoText) {
    const trimmedText = todoText.trim();

    if (!trimmedText) {
        statusMessage.textContent = "Please enter a task.";
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: trimmedText,
        completed: false
    };

    todos = [...todos, newTodo];

    saveTodos();
    renderTodos();

    todoInput.value = "";
    statusMessage.textContent = "Todo added successfully!";
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        const listItem = document.createElement("li");

        listItem.textContent = todo.text;

        if (todo.completed) {
            listItem.style.textDecoration = "line-through";
        }

        todoList.appendChild(listItem);
    });
}

addButton.addEventListener("click", () => {
    addTodo(todoInput.value);
});

todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo(todoInput.value);
    }
});

loadTodos();
renderTodos();
