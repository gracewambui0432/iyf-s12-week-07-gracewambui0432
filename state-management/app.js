
const STORAGE_KEY = "stateManagementApp";

const state = {
    todos: [],
    filter: "all",
    theme: "light"
};

// Load saved state
function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            if (parsed && typeof parsed === "object") {
                state.todos = Array.isArray(parsed.todos) ? parsed.todos : [];
                state.filter = ["all", "active", "completed"].includes(parsed.filter)
                    ? parsed.filter
                    : "all";
                state.theme = ["light", "dark"].includes(parsed.theme)
                    ? parsed.theme
                    : "light";
            }
        }
    } catch {
        console.warn("Could not load saved state.");
    }
}

// Save state and render
function setState(updates) {
    Object.assign(state, updates);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    render();
}

// Add task
function addTodo(text) {
    setState({
        todos: [
            ...state.todos,
            {
                id: Date.now(),
                text,
                completed: false
            }
        ]
    });
}

// Toggle task
function toggleTodo(id) {
    setState({
        todos: state.todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        )
    });
}

// Delete task
function deleteTodo(id) {
    setState({
        todos: state.todos.filter(todo => todo.id !== id)
    });
}

// Render tasks
function render() {
    const list = document.getElementById("todo-list");
    const count = document.getElementById("task-count");

    list.innerHTML = "";

    const filteredTodos = state.todos.filter(todo => {
        if (state.filter === "active") return !todo.completed;
        if (state.filter === "completed") return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");

        if (todo.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = todo.text;

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.addEventListener("click", () => toggleTodo(todo.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTodo(todo.id));

        li.append(span, completeButton, deleteButton);
        list.appendChild(li);
    });

    count.textContent = `${state.todos.length} total tasks`;

    document.body.classList.toggle("dark", state.theme === "dark");

    document.getElementById("filter").value = state.filter;
    document.getElementById("theme").value = state.theme;
}

// Form event
document.getElementById("todo-form").addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("todo-input");
    const text = input.value.trim();

    if (!text) return;

    addTodo(text);
    input.value = "";
});

// Filter event
document.getElementById("filter").addEventListener("change", event => {
    setState({ filter: event.target.value });
});

// Theme event
document.getElementById("theme").addEventListener("change", event => {
    setState({ theme: event.target.value });
});

// Start application
loadState();
render();
