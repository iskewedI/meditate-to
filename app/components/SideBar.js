import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Octicons } from '@expo/vector-icons';

const SideBar = ({ style, navigation }) => {
  const [barStatus, setBarStatus] = useState({
    expanded: false,
    animating: false,
    direction: 'right',
  });

  const translateAnim = useRef(new Animated.Value(0)).current;

  const animDuration = 300;

  useEffect(() => {
    const startAnim = () =>
      Animated.timing(translateAnim, {
        toValue: barStatus.direction === 'right' ? 20 : -20,
        duration: animDuration,
        useNativeDriver: false,
      }).start(() => setBarStatus(bar => ({ ...bar, animating: false })));

    if (barStatus.animating) {
      startAnim();
    }
  }, [translateAnim, barStatus, setBarStatus, animDuration]);

  const handleIconPress = () => {
    setBarStatus(({ expanded }) => ({
      expanded: !expanded,
      animating: true,
      direction: expanded ? 'left' : 'right',
    }));
  };

  return (
    <View style={style}>
      <Octicons
        style={styles.icon}
        name='three-bars'
        size={24}
        onPress={handleIconPress}
      />

      {(barStatus.expanded || barStatus.animating) && (
        <Animated.View
          style={
            (styles.contentContainer, { transform: [{ translateX: translateAnim }] })
          }
        >
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    color: 'black',
    marginTop: 30,
  },
  contentContainer: {},
});

export default SideBar;
