import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from './AppStack';
import ProfileScreen from '../screens/ProfileScreen';
import TodoListFetchScreen from '../screens/TodoListFetchScreen';
import TodoListOfflineScreen from '../screens/TodoListOfflineScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tâches" component={AppStack} />
      <Drawer.Screen name="Fetch (API)" component={TodoListFetchScreen} />
      <Drawer.Screen name="Offline (SQLite)" component={TodoListOfflineScreen} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
