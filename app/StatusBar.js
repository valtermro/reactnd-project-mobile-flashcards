import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar as NativeStatusBar } from 'react-native';

function StatusBar(props) {
  const { style } = props;

  return (
    <View style={{ ...style, height: Constants.statusBarHeight }}>
      <NativeStatusBar translucent backgroundColor={style.backgroundColor} />
    </View>
  );
}

export default StatusBar;
