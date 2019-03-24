import { combineReducers, applyMiddleware, createStore as reduxCreateStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { readAppState } from './lib/storage';
import { reducer as cards, receiveCards } from './cards/store';
import { reducer as decks, receiveDecks } from './decks/store';
import { RECEIVE_APP_DATA, PUSH_APP_NOTIFICATION, POP_APP_NOTIFICATION } from './actions';

export { Provider } from 'react-redux';

export function createStore() {
  return reduxCreateStore(
    combineReducers({
      app: reducer,
      cards: cards,
      decks: decks,
    }),
    applyMiddleware(thunk, logger)
  );
}


export const reducer = combineReducers({ state, notification });

function notification(state = null, action) {
  switch (action.type) {
    case PUSH_APP_NOTIFICATION: {
      return action.notification;
    }

    case POP_APP_NOTIFICATION: {
      return null;
    }

    default: {
      return state;
    }
  }
}

function state(state = { hasData: false }, action) {
  switch (action.type) {
    case RECEIVE_APP_DATA: {
      return {
        hasData: true,
      };
    }

    default: {
      return state;
    }
  }
}


export function loadAppState() {
  return async function (dispatch) {
    const data = await readAppState();
    dispatch(receiveDecks(data.decks));
    dispatch(receiveCards(data.cards));
    dispatch({ type: RECEIVE_APP_DATA });
  };
}

export function pushAppNotification(message, actionLabel, actionHandler) {
  return {
    type: PUSH_APP_NOTIFICATION,
    notification: { message, actionLabel, actionHandler },
  };
}

export function popAppNotification() {
  return {
    type: POP_APP_NOTIFICATION,
  };
}

export function getAppNotification(state) {
  return state.app.notification;
}

export function getAppState(state) {
  return state.app.state;
}
