import React from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import * as colors from '../colors';

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    width: 300,
    padding: 15,
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  tip: {
    fontSize: 12,
    marginTop: 18,
  },

  questionCard: {
    backgroundColor: colors.white,
  },
  questionText: {
    color: colors.primary,
  },
  questionTip: {
    color: colors.secondaryDark,
  },

  answerCard: {
    backgroundColor: colors.primary,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  answerText: {
    color: colors.white,
  },
  answerTip: {
    color: colors.dimmedWhite,
  },
});

class Card extends React.Component {
  opacityAnimatedValue = new Animated.Value(0)
  rotationAnimatedValue = new Animated.Value(0)

  state = {
    currentOpacityValue: 0,
    currentRotationValue: 0,
    questionOpacity: 1,
    questionRotation: '0deg',
    answerOpacity: 0,
    answerRotation: '180deg',
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.card.id === this.props.card.id) {
      return;
    }

    // make sure the "next" card is displayed with the answer hidden
    this.opacityAnimatedValue.setValue(0);
    this.rotationAnimatedValue.setValue(0);
  }

  componentDidMount = () => {
    this.rotationAnimatedValue.addListener((event) => {
      this.setState({ currentRotationValue: event.value });
    });

    this.opacityAnimatedValue.addListener((event) => {
      this.setState({ currentOpacityValue: event.value });
    });

    this.setState({
      questionRotation: this.rotationAnimatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      }),
      questionOpacity: this.opacityAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),

      answerRotation: this.rotationAnimatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
      }),
      answerOpacity: this.opacityAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    });
  }

  flip = () => {
    Animated.parallel([
      Animated.timing(this.opacityAnimatedValue, {
        toValue: (this.state.currentOpacityValue + 1) % 2,
        duration: 150,
      }),
      Animated.timing(this.rotationAnimatedValue, {
        toValue: (this.state.currentRotationValue + 180) % 360,
        duration: 150,
      }),
    ]).start();
  }

  render = () => {
    const { card } = this.props;
    const {
      currentRotationValue,
      questionRotation, questionOpacity,
      answerRotation, answerOpacity,
    } = this.state;

    const elevation = [0, 180].includes(currentRotationValue) ? 6 : 0;
    const questionAnimatedStyle = {
      elevation: elevation,
      opacity: questionOpacity,
      transform: [{ rotateX: questionRotation }],
    };
    const answerAnimatedStyle = {
      elevation: elevation,
      opacity: answerOpacity,
      transform: [{ rotateX: answerRotation }],
    };

    return (
      <TouchableWithoutFeedback onPress={this.flip}>
        <View style={styles.container}>
          <Animated.View style={[styles.card, styles.questionCard, questionAnimatedStyle]}>
            <Text style={[styles.text, styles.questionText]}>
              {card.question}
            </Text>
            <Text style={[styles.tip, styles.questionTip]}>
              Click to see the answer
            </Text>
          </Animated.View>

          <Animated.View style={[styles.card, styles.answerCard, answerAnimatedStyle]}>
            <Text style={[styles.text, styles.answerText]}>
              {card.answer}
            </Text>
            <Text style={[styles.tip, styles.answerTip]}>
              Click to see the question
            </Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Card;
