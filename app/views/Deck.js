import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import * as colors from '../colors';
import { getDeckById } from '../decks/store';
import { trimHeaderTitle } from '../lib/util';
import ActionButton from '../components/ActionButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    color: colors.primary,
    fontSize: 30,
  },
  cardCount: {
    color: colors.lightText,
    fontSize: 20,
    marginTop: 10,
  },

  actions: {
    alignItems: 'center',
    marginTop: 60,
  },
  startQuizButton: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  addCardButton: {
    backgroundColor: colors.secondary,
  },
});

class Deck extends React.Component {
  static navigationOptions = (props) => {
    return {
      headerBackTitle: trimHeaderTitle(props.navigation.getParam('backButtonTitle')),
    };
  }

  startQuiz = () => {
    this.props.navigation.navigate('Quiz', { deck: this.props.deck.id });
  }

  addCard = () => {
    this.props.navigation.navigate('NewCard', { deck: this.props.deck.id });
  }

  render = () => {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>
            {deck.title}
          </Text>
          <Text style={styles.cardCount}>
            {deck.cardCount} cards
          </Text>
        </View>

        <View style={styles.actions}>
          {deck.cardCount > 0 && (
            <ActionButton style={styles.startQuizButton} onPress={this.startQuiz}>
              Start quiz
            </ActionButton>
          )}

          <ActionButton style={styles.addCardButton} onPress={this.addCard}>
            Add card
          </ActionButton>
        </View>
      </View>
    );
  }
}


function mapStateToProps(state, props) {
  return {
    deck: getDeckById(state, props.navigation.getParam('deck')),
  };
}

export default connect(mapStateToProps)(Deck);
