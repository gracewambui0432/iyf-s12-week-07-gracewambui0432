import {
  addTodo as addTodoLogic,
  toggleTodo as toggleTodoLogic,
  deleteTodo as deleteTodoLogic,
  editTodo as editTodoLogic,
  clearCompleted as clearCompletedLogic
} from "./todo-logic.js";

import {
  loadTodos,
  saveTodos
} from "./storage.js";

// Application state
let todos = loadTodos();
let currentFilter = "all";

// Get all todos
export function getTodos() {
  return todos;
}

// Get current filter
export function getCurrentFilter() {
  return currentFilter;
}

// Change current filter
export function setCurrentFilter(filter) {
  currentFilter = filter;
}

// Add todo
export function addTodo(text) {
  todos = addTodoLogic(todos, text);
  saveTodos(todos);
}

// Toggle todo
export function toggleTodo(id) {
  todos = toggleTodoLogic(todos, id);
  saveTodos(todos);
}

// Delete todo
export function deleteTodo(id) {
  todos = deleteTodoLogic(todos, id);
  saveTodos(todos);
}

// Edit todo
export function editTodo(id, newText) {
  todos = editTodoLogic(todos, id, newText);
  saveTodos(todos);
}

// Clear completed todos
export function clearCompleted() {
  todos = clearCompletedLogic(todos);
  saveTodos(todos);
}
