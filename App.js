import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import SideBar from './app/components/SideBar';
import MeditationScreen from './app/screens/MeditationScreen';

// FileSystem.deleteAsync(DB_DIR);

export default function App() {
  // 'r' Twice to reload the android studio

  const [started, setStarted] = useState(false);

  return (
    <View style={styles.container}>
      <SideBar />
      {!started && <Button onPress={() => setStarted(true)} title='Start' />}
      {started && <MeditationScreen />}

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
