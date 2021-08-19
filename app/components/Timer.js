import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

const Timer = ({ from = 5, to = 0, onFinish }) => {
  const [time, setTime] = useState(from);

  useEffect(() => {
    if (time <= to) return onFinish(from - to);

    setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  }, [to, from, time, setTime]);

  return <Text style={styles.text}>{time}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default Timer;
