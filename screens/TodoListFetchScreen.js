import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { fetchTodosFetch, fetchTodosAxios } from '../services/api';
import { ThemeContext } from '../context/ThemeContext';

export default function TodoListFetchScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useAxios, setUseAxios] = useState(false);
  const [delayMs, setDelayMs] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fn = useAxios ? fetchTodosAxios : fetchTodosFetch;
    fn(delayMs)
      .then(setTodos)
      .catch(() => setError('Impossible de charger les tâches'))
      .finally(() => setLoading(false));
  }, [useAxios, delayMs]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#121212' : '#fff' }]}>
      <Button title={`Passer en mode ${theme === 'light' ? 'dark' : 'light'}`} onPress={toggleTheme} />
      <View style={styles.row}>
        <Button title={useAxios ? 'Use fetch' : 'Use axios'} onPress={() => setUseAxios((v) => !v)} />
        <Button title="Add 2s delay" onPress={() => setDelayMs(2000)} />
        <Button title="Clear delay" onPress={() => setDelayMs(0)} />
      </View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10, color: theme === 'dark' ? '#fff' : '#000' }}>{item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
});