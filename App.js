import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { readAppState } from './app/lib/storage';
import { createStore, Provider } from './app/store';
import * as colors from './app/colors';
import { receiveCards } from './app/cards/store';
import { receiveDecks } from './app/decks/store';

import StatusBar from './app/StatusBar';
import NewDeckView from './app/views/NewDeck';
import DeckListView from './app/views/DeckList';

const HomeNavigator = createMaterialTopTabNavigator({
  Home: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  NewDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  },
}, {
  navigationOptions: {
    // TODO: (?)
    // header: null,
  },
  tabBarOptions: {
    labelStyle: {
      color: colors.white,
    },
    style: {
      backgroundColor: colors.primary,
      height: 60,
    },
  },
});

const AppContainer = createAppContainer(HomeNavigator);

const store = createStore();

export default class App extends React.Component {
  componentDidMount = async () => {
    // TODO: create an action for this (?)
    const data = await readAppState();
    store.dispatch(receiveCards(data.cards));
    store.dispatch(receiveDecks(data.decks));
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar style={{ backgroundColor: colors.primary }} />

        <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
