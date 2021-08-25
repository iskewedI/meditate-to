import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

const Timer = ({ from = 5, to = 0, onFinish }) => {
  const [timerStats, setTimerStats] = useState({
    time: from,
    current: 'paused',
  });

  useEffect(() => {
    if (timerStats.time <= to || timerStats.current === 'stopped')
      return onFinish(Math.abs(timerStats.time - from));

    if (timerStats.current === 'started') {
      setTimeout(() => {
        setTimerStats(stats => ({ ...stats, time: stats.time - 1 }));
      }, 1000);
    }
  }, [to, from, timerStats, setTimerStats]);

  return (
    <View>
      <Text style={styles.text}>{timerStats.time}</Text>
      <Button
        title={timerStats.current === 'paused' ? 'Start' : 'Pause'}
        onPress={() =>
          setTimerStats(stats => ({
            ...stats,
            current: stats.current === 'paused' ? 'started' : 'paused',
          }))
        }
      />
      {timerStats.current === 'started' && (
        <Button
          title='Stop'
          onPress={() => setTimerStats(stats => ({ ...stats, current: 'finished' }))}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default Timer;
