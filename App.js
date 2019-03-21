import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { readAppState } from './app/lib/storage';
import { createStore, Provider } from './app/store';
import * as colors from './app/colors';
import { receiveCards } from './app/cards/store';
import { receiveDecks } from './app/decks/store';

import StatusBar from './app/components/StatusBar';
import DeckView from './app/views/Deck';
import NewDeckView from './app/views/NewDeck';
import DeckListView from './app/views/DeckList';

const HomeNavigator = createMaterialTopTabNavigator({
  DeckList: {
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
    header: null,
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

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      headerBackTitle: 'UdaciCards',
    },
  },
  Deck: {
    screen: DeckView,
  },
}, {
  headerBackTitleVisible: true,
  cardStyle: {
    backgroundColor: colors.viewBackground,
  },
  defaultNavigationOptions: {
    headerTintColor: colors.white,
    headerStyle: {
      backgroundColor: colors.primary,
      height: 36,
      paddingBottom: 8,
    },
  },
});

const store = createStore();
const AppContainer = createAppContainer(AppNavigator);

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

        <AppContainer />
      </Provider>
    );
  }
}
