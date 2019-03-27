import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import * as colors from './colors';
import DeckView from './views/Deck';
import QuizView from './views/Quiz';
import NewDeckView from './views/NewDeck';
import NewCardView from './views/NewCard';
import DeckListView from './views/DeckList';

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

export const AppNavigator = createStackNavigator({
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
