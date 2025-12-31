import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../store/todosSlice';
import AppBar from '../components/AppBar';

export default function TodoListScreen({ navigation }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    // seed initial todos
    dispatch(addTodo({ id: 1, title: 'Faire les courses' }));
    dispatch(addTodo({ id: 2, title: 'Sortir le chien' }));
    dispatch(addTodo({ id: 3, title: 'Coder une app RN' }));
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Mes tâches" />
      <View style={styles.container}>
        <FlatList
          data={todos}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Détails', item)}>
              <Text style={styles.item}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 10, fontSize: 18 },
});