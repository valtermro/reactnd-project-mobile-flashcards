import * as redux from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { readAppState } from './lib/storage';
import { reducer as cards, receiveCards } from './cards/store';
import { reducer as decks, receiveDecks } from './decks/store';
import { RECEIVE_APP_DATA } from './actions';

export { Provider } from 'react-redux';

export function createStore() {
  return redux.createStore(
    redux.combineReducers({
      app: reducer,
      cards: cards,
      decks: decks,
    }),
    redux.applyMiddleware(thunk, logger)
  );
}


function reducer(state = { hasData: false }, action) {
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

export function getAppState(state) {
  return state.app;
}
