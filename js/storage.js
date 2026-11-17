
const STORAGE_KEY = "todos";

// Save todos to localStorage
export function saveTodos(todos) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(todos)
    );
  } catch (error) {
    console.error("Error saving todos:", error);
  }
}

// Load todos from localStorage
export function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);

    if (savedTodos === null) {
      return [];
    }

    const todos = JSON.parse(savedTodos);

    // Make sure saved data is an array
    if (!Array.isArray(todos)) {
      return [];
    }

    // Validate individual todo items
    return todos.filter(todo =>
      todo &&
      typeof todo.id === "number" &&
      typeof todo.text === "string" &&
      typeof todo.completed === "boolean"
    );

  } catch (error) {
    console.error("Error loading todos:", error);
    return [];
  }
}

// Remove todos from localStorage
export function clearStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
}
