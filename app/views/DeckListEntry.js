import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as colors from '../colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 2,
    elevation: 4,
    margin: 10,
    marginRight: 20,
    marginLeft: 20,
    padding: 5,
  },
  title: {
    color: colors.defaultText,
    fontSize: 20,
    padding: 5,
  },
  cardCount: {
    color: colors.lightText,
    fontSize: 18,
    padding: 5,
  },
});

function DeckListEntry(props) {
  const { deck, onPress } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.title}>
        {deck.title}
      </Text>
      <Text style={styles.cardCount}>
        {deck.cardCount} cards
      </Text>
    </TouchableOpacity>
  );
}

export default DeckListEntry;
