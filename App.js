import React from 'react';
import { createAppContainer } from 'react-navigation';
import * as colors from './app/colors';
import { AppNavigator } from './app/navigation';
import { Provider, createStore, loadAppState } from './app/store';
import { setupLocalNotification } from './app/lib/notification';

import StatusBar from './app/components/StatusBar';
import NotificationDisplay from './app/components/NotificationDisplay';

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
