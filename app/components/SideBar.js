import React, { useState, useRef, useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';

const SideBar = ({ children, style }) => {
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
          {children}
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
  },
  contentContainer: {},
});

export default SideBar;
