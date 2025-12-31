import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { loadTodos, addTodoOffline, updateTodoOffline, removeTodoOffline } from '../services/database';

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const refreshTodos = async () => {
    const items = await loadTodos();
    setTodos(items);
  };

  const handleAddOrUpdate = async () => {
    if (!title.trim()) return;
    if (editingId) {
      await updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      await addTodoOffline(title);
    }
    setTitle('');
    await refreshTodos();
  };

  const handleDelete = async (id) => {
    await removeTodoOffline(id);
    await refreshTodos();
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <View style={[styles.wrapper, { backgroundColor: theme === 'dark' ? '#121212' : '#fff' }]}>
      <Button title={`Passer en mode ${theme === 'light' ? 'dark' : 'light'}`} onPress={toggleTheme} />
      <View style={styles.inputWrap}>
        <TextInput
          placeholder="Tâche offline"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <Button title={editingId ? '✏️ Mettre à jour' : '➕ Ajouter hors ligne'} onPress={handleAddOrUpdate} />
      </View>

      {todos.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Aucune tâche disponible hors ligne</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={{ flex: 1 }}>{item.title}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setTitle(item.title);
                    setEditingId(item.id);
                  }}
                >
                  <Text style={styles.actionBtn}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={[styles.actionBtn, { color: 'red' }]}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingTop: 40, paddingHorizontal: 12 },
  inputWrap: { padding: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { fontSize: 18, marginLeft: 12 },
});