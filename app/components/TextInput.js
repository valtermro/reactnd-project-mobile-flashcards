import React from 'react';
import { View, TextInput as NativeTextInput, StyleSheet, Animated } from 'react-native';
import * as colors from '../colors';

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    color: colors.textDefault,
    width: 340,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.textLight,
  },
  placeholder: {
    color: colors.textLight,
  },
  bottomLine: {
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
  },
});

class TextInput extends React.Component {
  bottomLineAnimatedValue = new Animated.Value(0)

  state = {
    bottomLineWidth: '0%',
  }

  componentDidMount = () => {
    this.setState({
      bottomLineWidth: this.bottomLineAnimatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      }),
    });
  }

  animateBottomLine = (width) => {
    Animated.timing(this.bottomLineAnimatedValue, {
      toValue: width,
      duration: 150,
    }).start();
  }

  onFocus = () => {
    this.animateBottomLine(100);
  }

  onBlur = () => {
    this.animateBottomLine(0);
  }

  render = () => {
    const { placeholder, value, onChangeText } = this.props;
    const { bottomLineWidth } = this.state;

    return (
      <View>
        <NativeTextInput
          style={[styles.input]}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={styles.placeholder.color}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <Animated.View style={[styles.bottomLine, { width: bottomLineWidth }]} />
      </View>
    );
  }
}

export default TextInput;
