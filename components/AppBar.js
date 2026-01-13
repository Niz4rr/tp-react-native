import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

export default function AppBar({ title, back }) {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.appBar}>
      {back ? (
        <TouchableOpacity style={styles.leftButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.leftPlaceholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  leftButton: { padding: 8 },
  leftPlaceholder: { width: 64 },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    padding: 8,
  },
  buttonText: { color: '#fff', fontSize: 14 },
});