import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
} from 'react-native';
import SideBar from './app/components/SideBar';
import MeditationScreen from './app/screens/MeditationScreen';

export default function App() {
  const [started, setStarted] = useState(false);
  const [meditationTime, setMeditationTime] = useState(5);

  const [configOpened, setConfigOpened] = useState('none');

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SideBar style={styles.sidebar}>
        <TouchableOpacity onPress={() => setConfigOpened('time')}>
          <Text>Change meditation time</Text>
          <Modal visible={configOpened === 'time'}>
            <Text>New meditation time: </Text>
            <TextInput></TextInput>
          </Modal>
        </TouchableOpacity>
      </SideBar>
      <View style={styles.appContainer}>
        {!started && <Button onPress={() => setStarted(true)} title='Start' />}
        {started && <MeditationScreen meditationTime={meditationTime} />}
      </View>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff' },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebar: {
    marginTop: 30,
    marginLeft: 10,
    position: 'absolute',
  },
});
