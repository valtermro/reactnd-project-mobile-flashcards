import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as colors from '../colors';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#909090',
    borderRadius: 2,
    width: 120,
    paddingTop: 5,
    fontSize: 20,
    paddingBottom: 5,
  },
  text: {
    color: colors.white,
  },
});

function ActionButton(props) {
  const { children, style, onPress } = props;

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default ActionButton;
