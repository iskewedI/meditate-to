import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SideBar from './app/components/SideBar';
import MeditationScreen from './app/screens/MeditationScreen';
import SettingsScreen from './app/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [screen, setScreen] = useState({ name: 'Start menu' });

  const [meditationTime, setMeditationTime] = useState(5);

  const handleTimeChange = ({ minutes, seconds }) => {
    const minutesToSecond = minutes <= 0 ? minutes : minutes * 60;

    setMeditationTime(minutesToSecond + seconds);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: SideBar,
        }}
      >
        <Stack.Screen
          name='Home'
          component={MeditationScreen}
          options={{ title: 'Home' }}
          initialParams={{ meditationTime }}
        />

        <Stack.Screen
          name='Settings'
          component={SettingsScreen}
          options={{ title: 'Settings' }}
          initialParams={{ handleTimeChange }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
