import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as colors from '../colors';
import { parseScoreValue } from '../lib/util';
import { rescheduleLocalNotification } from '../lib/notification';
import Card from '../cards/Card';
import { getCardsByDeck } from '../cards/store';
import ActionButton from '../components/ActionButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  questionHeader: {
    color: colors.textLight,
    fontSize: 14,
    marginTop: 40,
  },
  questionCard: {
    marginTop: 40,
  },

  questionActions: {
    marginTop: 40,
  },
  correctButton: {
    backgroundColor: colors.success,
    marginTop: 10,
  },
  incorrectButton: {
    backgroundColor: colors.error,
    marginTop: 10,
  },

  resultHeader: {
    color: colors.textDefault,
    marginTop: 100,
  },
  resultScore: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 50,
    marginTop: 20,
  },
  perfectScoreMessage: {
    color: colors.secondaryDark,
    fontSize: 28,
    marginTop: 20,
  },
  backToDeckButton: {
    marginTop: 40,
    backgroundColor: colors.primary,
  },
  restartButton: {
    marginTop: 10,
    backgroundColor: colors.error,
  },
});

class Quiz extends React.Component {
  initialState = () => {
    return {
      currentCardIndex: 0,
      correctAnswerCount: 0,
    };
  }

  state = this.initialState()

  next = (result) => {
    this.setState((state) => ({
      currentCardIndex: state.currentCardIndex + 1,
      correctAnswerCount: state.correctAnswerCount + (result === 'correct' ? 1 : 0),
    }));
  }

  restart = () => {
    this.setState(this.initialState());
  }

  backToDeck = () => {
    this.props.navigation.navigate('Deck', { deck: this.props.deck });
  }

  render = () => {
    const { cards } = this.props;
    const { currentCardIndex, correctAnswerCount } = this.state;
    const cardCount = cards.length;

    if (currentCardIndex >= cardCount) {
      rescheduleLocalNotification();

      return (
        <View style={styles.container}>
          <Text style={styles.resultHeader}>
            Your score is:
          </Text>

          <Text style={styles.resultScore}>
            {parseScoreValue(correctAnswerCount / cardCount * 100, 2)}%
          </Text>

          {correctAnswerCount === cardCount && (
            <Text style={styles.perfectScoreMessage}>
              Congratulations!
            </Text>
          )}

          <ActionButton style={styles.backToDeckButton} onPress={this.backToDeck}>
            Back to deck
          </ActionButton>

          <ActionButton style={styles.restartButton} onPress={this.restart}>
            Restart quiz
          </ActionButton>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.questionHeader}>
          Question {String(currentCardIndex + 1).padStart('0', String(cardCount).length)}
          {' of '}
          {cardCount}
        </Text>

        <View style={styles.questionCard}>
          <Card card={cards[currentCardIndex]} />
        </View>

        <View style={styles.questionActions}>
          <Text style={styles.questionHeader}>
            How did you do?
          </Text>
        </View>

        <ActionButton
          style={styles.correctButton}
          onPress={() => this.next('correct')}
        >
          Correct
        </ActionButton>

        <ActionButton
          style={styles.incorrectButton}
          onPress={() => this.next('incorrect')}
        >
          Incorret
        </ActionButton>
      </View>
    );
  }
}


function mapStateToProps(state, props) {
  const deck = props.navigation.getParam('deck');

  return {
    deck: deck,
    cards: getCardsByDeck(state, deck),
  };
}

export default connect(mapStateToProps)(Quiz);
