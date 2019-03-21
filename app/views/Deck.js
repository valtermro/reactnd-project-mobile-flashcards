import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as colors from '../colors';
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
      headerBackTitle: trimHeaderTitle(props.navigation.getParam('deck').title),
    };
  }

  startQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      deck: this.props.navigation.getParam('deck'),
    });
  }

  addCard = () => {
    // TODO
  }

  render = () => {
    const deck = this.props.navigation.getParam('deck');

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
              <Text>Start quiz</Text>
            </ActionButton>
          )}

          <ActionButton style={styles.addCardButton} onPress={this.addCard}>
            <Text>Add card</Text>
          </ActionButton>
        </View>
      </View>
    );
  }
}

export default Deck;
