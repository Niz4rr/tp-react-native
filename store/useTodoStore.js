import { create } from "zustand";
import { db } from "../services/database";
import {
  fetchTodosFromFirestore,
  addTodoToFirestore,
  deleteTodoFromFirestore,
} from "../services/firestore";

export const useTodoStore = create((set, get) => ({
  todos: [],
  loadTodos: async (uid) => {
    // charger Firestore
    const remoteTodos = await fetchTodosFromFirestore(uid);

    // injecter SQLite
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM todos");
      remoteTodos.forEach((t) =>
        tx.executeSql("INSERT INTO todos (id, title) VALUES (?, ?)", [
          t.id,
          t.title,
        ])
      );
    });

    // charger SQLite vers Zustand
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM todos", [], (_, res) => {
        set({ todos: res.rows._array });
      });
    });
  },
  addTodo: async (uid, title) => {
    // SQLite
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO todos (title) VALUES (?)", [title]);
    });
    // Firestore
    await addTodoToFirestore(uid, { title });
    // Refresh
    get().loadTodos(uid);
  },
  deleteTodo: async (uid, id) => {
    // Firestore
    await deleteTodoFromFirestore(uid, id);
    // SQLite
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM todos WHERE id = ?", [id]);
    });
    // Refresh
    get().loadTodos(uid);
  },
}));
