import React from 'react';
import { Text, StyleSheet } from 'react-native';
import * as colors from '../colors';

const styles = StyleSheet.create({
  text: {
    color: colors.error,
    fontSize: 12,
  },
});

function InputErrorMessage(props) {
  const { children } = props;

  return (
    <Text style={styles.text}>
      {children}
    </Text>
  );
}

export default InputErrorMessage;
