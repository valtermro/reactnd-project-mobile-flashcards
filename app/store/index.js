import * as redux from 'redux';
import { createLogger } from 'redux-logger';
import { reducer as cards } from '../cards/store';
import { reducer as decks } from '../decks/store';

export { Provider } from 'react-redux';

export function createStore() {
  return redux.createStore(
    redux.combineReducers({ cards, decks }),
    redux.applyMiddleware(createLogger())
  );
}
