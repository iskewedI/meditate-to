import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';

const SideBar = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <Image
        width={'100%'}
        height={'100%'}
        source={require('../assets/Hamburger_icon.svg')}
        resizeMode='contain'
      />
      <Text>Image</Text>
      {expanded && <View>{children}</View>}
    </View>
  );
};

export default SideBar;
