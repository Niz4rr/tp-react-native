import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, color: theme.text }}>Profil utilisateur</Text>
        {user ? (
          <>
            <Text style={{ color: theme.text, marginTop: 10 }}>Email: {user.email}</Text>
            <Text style={{ color: theme.text, marginTop: 6 }}>UID: {user.uid}</Text>
            <View style={{ marginTop: 20 }}>
              <Button title="Se déconnecter" onPress={logout} color={theme.primary} />
            </View>
          </>
        ) : (
          <Text style={{ color: theme.text, marginTop: 10 }}>Aucun utilisateur connecté</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
