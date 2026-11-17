
import { describe, it, expect } from "vitest";

import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  filterTodos,
  clearCompleted,
  countActiveTodos
} from "../js/todo-logic.js";

describe("Todo Logic Tests", () => {

  it("should add a new todo", () => {
    const todos = [];

    const result = addTodo(todos, "Learn JavaScript");

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe("Learn JavaScript");
    expect(result[0].completed).toBe(false);
  });

  it("should toggle a todo as completed", () => {
    const todos = [
      { id: 1, text: "Study", completed: false }
    ];

    const result = toggleTodo(todos, 1);

    expect(result[0].completed).toBe(true);
  });

  it("should delete a todo", () => {
    const todos = [
      { id: 1, text: "Study", completed: false },
      { id: 2, text: "Read", completed: false }
    ];

    const result = deleteTodo(todos, 1);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("should edit a todo", () => {
    const todos = [
      { id: 1, text: "Study", completed: false }
    ];

    const result = editTodo(todos, 1, "Study JavaScript");

    expect(result[0].text).toBe("Study JavaScript");
  });

  it("should filter active todos", () => {
    const todos = [
      { id: 1, text: "Study", completed: false },
      { id: 2, text: "Read", completed: true }
    ];

    const result = filterTodos(todos, "active");

    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(false);
  });

  it("should filter completed todos", () => {
    const todos = [
      { id: 1, text: "Study", completed: false },
      { id: 2, text: "Read", completed: true }
    ];

    const result = filterTodos(todos, "completed");

    expect(result).toHaveLength(1);
    expect(result[0].completed).toBe(true);
  });

  it("should clear completed todos", () => {
    const todos = [
      { id: 1, text: "Study", completed: false },
      { id: 2, text: "Read", completed: true }
    ];

    const result = clearCompleted(todos);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("should count active todos", () => {
    const todos = [
      { id: 1, text: "Study", completed: false },
      { id: 2, text: "Read", completed: true },
      { id: 3, text: "Code", completed: false }
    ];

    expect(countActiveTodos(todos)).toBe(2);
  });

});
