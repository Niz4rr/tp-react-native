import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todos.db');

export const initDB = () =>
  new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT);`
        );
      },
      (err) => reject(err),
      () => resolve()
    );
  });

export const addTodoOffline = (title) =>
  new Promise((resolve, reject) => {
    const id = Date.now();
    db.transaction(
      (tx) => {
        tx.executeSql('INSERT INTO todos (id, title) values (?, ?);', [id, title]);
      },
      (err) => reject(err),
      () => resolve({ id, title })
    );
  });

export const updateTodoOffline = (id, title) =>
  new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql('UPDATE todos SET title = ? WHERE id = ?;', [title, id]);
      },
      (err) => reject(err),
      () => resolve()
    );
  });

export const removeTodoOffline = (id) =>
  new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM todos WHERE id = ?;', [id]);
      },
      (err) => reject(err),
      () => resolve()
    );
  });

export const loadTodos = () =>
  new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql('SELECT * FROM todos;', [], (_, { rows }) => {
          const items = [];
          for (let i = 0; i < rows.length; i++) items.push(rows.item(i));
          resolve(items);
        });
      },
      (err) => reject(err)
    );
  });
