import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import _ from 'lodash';

const SettingsScreen = ({ handleTimeChange }) => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  const handleSave = () => {
    handleTimeChange(time);
  };

  return (
    <SafeAreaView
      style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
      <Text style={{ marginBottom: 10 }}>New meditation time: </Text>

      <View style={{ flexDirection: 'row' }}>
        <Picker
          style={{ width: '30%' }}
          selectedValue={time.minutes}
          onValueChange={newMinutes =>
            setTime(previousTime => ({ ...previousTime, minutes: newMinutes }))
          }
          mode='dropdown'
        >
          {_.range(0, 60, 5).map(n => (
            <Picker.Item key={n} label={n.toString()} value={n} />
          ))}
        </Picker>
        <Text>:</Text>
        <Picker
          style={{ width: '30%' }}
          selectedValue={time.seconds}
          onValueChange={newSeconds =>
            setTime(previousTime => ({ ...previousTime, seconds: newSeconds }))
          }
          mode='dropdown'
        >
          {_.range(0, 60, 15).map(n => (
            <Picker.Item key={n} label={n.toString()} value={n} />
          ))}
        </Picker>
        <Button title='Save' onPress={() => handleSave()} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
