import {
  filterTodos,
  countActiveTodos
} from "./todo-logic.js";

// Get DOM elements
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");

// Create a todo element
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";

  if (todo.completed) {
    li.classList.add("completed");
  }

  li.dataset.id = todo.id;

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = todo.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.action = "delete";

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

// Update remaining task count
export function updateStats(todos) {
  const remaining = countActiveTodos(todos);

  itemsLeft.textContent =
    `${remaining} ${remaining === 1 ? "item" : "items"} left`;
}

// Render todos on the page
export function renderTodos(todos, currentFilter) {
  todoList.innerHTML = "";

  const filteredTodos = filterTodos(todos, currentFilter);

  filteredTodos.forEach(todo => {
    todoList.appendChild(createTodoElement(todo));
  });

  updateStats(todos);
}

// Update filter button appearance
export function updateFilterButtons(filters, currentFilter) {
  filters.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === currentFilter
    );
  });
}

// Handle editing a todo

export function editTodoElement(todo, span, onSave, onCancel) {
  const inputEdit = document.createElement("input");

  inputEdit.type = "text";
  inputEdit.className = "edit-input";
  inputEdit.value = todo.text;

  span.replaceWith(inputEdit);

  inputEdit.focus();
  inputEdit.select();

  let editing = true;

  function finishEditing(save) {
    if (!editing) return;

    editing = false;

    const newText = inputEdit.value.trim();

    if (save && newText !== "") {
      onSave(todo.id, newText);
    } else {
      onCancel();
    }
  }

  inputEdit.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      finishEditing(true);
    }

    if (event.key === "Escape") {
      finishEditing(false);
    }
  });

  inputEdit.addEventListener("blur", () => {
    finishEditing(true);
  });
}
