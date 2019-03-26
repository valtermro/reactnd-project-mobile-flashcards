import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import * as colors from '../colors';
import { getAppState } from '../store';
import { getAllDecks } from '../decks/store';
import DeckListEntry from '../decks/DeckListEntry';
import ActionButton from '../components/ActionButton';

function mapStateToProps(state) {
  return {
    loading: !getAppState(state).hasData,
    decks: getAllDecks(state),
  };
}

const styles = StyleSheet.create({
  loadingIndicator: {
    color: colors.secondaryDark,
    marginTop: 100,
  },
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
    this.props.navigation.navigate('Deck', { deck: deck.id });
  }

  render = () => {
    const { loading, decks, navigation } = this.props;

    if (loading) {
      return (
        <ActivityIndicator
          size='large'
          style={styles.loadingIndicator}
          color={styles.loadingIndicator.color}
        />
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
