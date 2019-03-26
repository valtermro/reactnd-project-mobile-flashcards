import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import * as colors from './app/colors';
import { Provider, createStore, loadAppState } from './app/store';
import { setupLocalNotification } from './app/lib/notification';

import StatusBar from './app/components/StatusBar';
import NotificationDisplay from './app/components/NotificationDisplay';
import DeckView from './app/views/Deck';
import QuizView from './app/views/Quiz';
import NewDeckView from './app/views/NewDeck';
import NewCardView from './app/views/NewCard';
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
      justifyContent: 'center',
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
  Quiz: {
    screen: QuizView,
  },
  NewCard: {
    screen: NewCardView,
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
    setupLocalNotification();
    store.dispatch(loadAppState());
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar style={{ backgroundColor: colors.primary }} />
        <AppContainer />
        <NotificationDisplay />
      </Provider>
    );
  }
}
