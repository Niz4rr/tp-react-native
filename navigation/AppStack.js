import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailsScreen from '../screens/TodoDetailsScreen';
import TodoListFetchScreen from '../screens/TodoListFetchScreen';
import TodoListOfflineScreen from '../screens/TodoListOfflineScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Liste" component={TodoListScreen} />
      <Stack.Screen name="Détails" component={TodoDetailsScreen} />
      <Stack.Screen name="Fetch" component={TodoListFetchScreen} />
      <Stack.Screen name="Offline" component={TodoListOfflineScreen} />
    </Stack.Navigator>
  );
}
