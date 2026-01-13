import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTodoStore } from '../store/useTodoStore';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function TodoDetailsScreen({ route, navigation }) {
  const { id, title } = route.params;
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    if (!user) return;
    await deleteTodo(user.uid, id);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{title}</Text>
      <Button title="Supprimer cette tâche" color="red" onPress={handleDelete} />
    </View>
  );
}
