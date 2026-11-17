import {
  getTodos,
  getCurrentFilter,
  setCurrentFilter,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted
} from "./state.js";

import {
  renderTodos,
  updateFilterButtons,
  editTodoElement
} from "./ui.js";

// Get HTML elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// Render the application
function refreshTodos() {
  renderTodos(getTodos(), getCurrentFilter());
}

// Add a new todo
form.addEventListener("submit", event => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") return;

  addTodo(text);

  input.value = "";
  input.focus();

  refreshTodos();
});

// Handle clicks on todo items
todoList.addEventListener("click", event => {
  const li = event.target.closest(".todo-item");

  if (!li) return;

  const id = Number(li.dataset.id);

  if (event.target.dataset.action === "delete") {
    deleteTodo(id);
    refreshTodos();
    return;
  }

  if (event.target.classList.contains("todo-text")) {
    toggleTodo(id);
    refreshTodos();
  }
});

// Edit todo on double click
todoList.addEventListener("dblclick", event => {
  if (!event.target.classList.contains("todo-text")) {
    return;
  }

  const li = event.target.closest(".todo-item");
  const id = Number(li.dataset.id);

  const todo = getTodos().find(todo => todo.id === id);

  if (todo) {
    editTodoElement(
      todo,
      event.target,
      (todoId, newText) => {
        editTodo(todoId, newText);
        refreshTodos();
      },
      refreshTodos
    );
  }
});

// Filter buttons
filters.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    setCurrentFilter(filter);

    updateFilterButtons(filters, getCurrentFilter());

    refreshTodos();
  });
});

// Clear completed todos
clearCompletedBtn.addEventListener("click", () => {
  clearCompleted();
  refreshTodos();
});

// Initialize application
updateFilterButtons(filters, getCurrentFilter());
refreshTodos();

