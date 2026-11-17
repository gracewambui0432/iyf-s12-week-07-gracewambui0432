// Add a new todo
export function addTodo(todos, text) {
  const newTodo = {
    id: Date.now() + Math.random(),
    text: text,
    completed: false
  };

  return [...todos, newTodo];
}

// Toggle todo completion
export function toggleTodo(todos, id) {
  return todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed
      };
    }

    return todo;
  });
}

// Delete a todo
export function deleteTodo(todos, id) {
  return todos.filter(todo => todo.id !== id);
}

// Edit a todo
export function editTodo(todos, id, newText) {
  return todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        text: newText
      };
    }

    return todo;
  });
}

// Filter todos
export function filterTodos(todos, filter) {
  if (filter === "active") {
    return todos.filter(todo => !todo.completed);
  }

  if (filter === "completed") {
    return todos.filter(todo => todo.completed);
  }

  return todos;
}

// Clear completed todos
export function clearCompleted(todos) {
  return todos.filter(todo => !todo.completed);
}

// Count remaining todos
export function countActiveTodos(todos) {
  return todos.filter(todo => !todo.completed).length;
}