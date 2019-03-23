import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as colors from '../colors';
import { getAppState } from '../store';
import { getAllDecks } from '../decks/store';
import { getCardsByDeck } from '../cards/store';
import DeckListEntry from '../decks/DeckListEntry';
import ActionButton from '../components/ActionButton';

function mapStateToProps(state) {
  return {
    loading: !getAppState(state).hasData,
    decks: getAllDecks(state).map((deck) => ({
      ...deck,
      cardCount: getCardsByDeck(state, deck.id).length,
    })),
  };
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
  },
  emptyHeader: {
    color: colors.textDefault,
    marginTop: 80,
    fontSize: 16,
  },
  createDeckButton: {
    backgroundColor: colors.primary,
    marginTop: 40,
  },
});

class DeckList extends React.Component {
  keyExtractor = (deck) => {
    return deck.id;
  }

  renderItem = (data) => {
    return (
      <DeckListEntry
        deck={data.item}
        onPress={() => this.openDeck(data.item)}
      />
    );
  }

  openDeck = (deck) => {
    this.props.navigation.navigate('Deck', { deck });
  }

  render = () => {
    const { loading, decks, navigation } = this.props;

    if (loading) {
      return (
        <View>
          {/* TODO */}
          <Text>Loading...</Text>
        </View>
      );
    }

    if (decks.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyHeader}>
            You don't have any decks yet.
          </Text>

          <ActionButton
            style={styles.createDeckButton}
            onPress={() => navigation.navigate('NewDeck')}
          >
            Create a deck
          </ActionButton>
        </View>
      );
    }

    return (
      <FlatList
        data={decks}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

export default connect(mapStateToProps)(DeckList);
