import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import { getAllDecks } from '../decks/store';
import { getCardsByDeck } from '../cards/store';
import DeckListEntry from './DeckListEntry';

function mapStateToProps(state) {
  const decks = getAllDecks(state);

  return {
    // NOTE: this only works because all of the app's data is loaded together
    loading: decks.length === 0,

    decks: decks.map((deck) => ({
      ...deck,
      cardCount: getCardsByDeck(state, deck.id).length,
    })),
  };
}

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
    // TODO
    return deck;
  }

  render = () => {
    const { loading, decks } = this.props;

    if (loading) {
      return (
        <View>
          {/* TODO */}
          <Text>Loading...</Text>
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