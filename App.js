import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

import AuthProvider, { AuthContext } from './context/AuthContext';
import AppDrawer from './navigation/AppDrawer';
import LoginScreen from './screens/LoginScreen';
import { store } from './store/store';
import { ThemeProvider } from './context/ThemeContext';
import { initDB } from './services/database';

function RootNavigator() {
  const { user } = useContext(AuthContext);
  return user ? <AppDrawer /> : <LoginScreen />;
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await initDB();
      } catch (e) {
        console.warn('DB init failed', e);
      }
      setDbReady(true);
    };
    prepare();
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}
