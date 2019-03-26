import uuid from 'uuid';
import { combineReducers } from 'redux';
import { validateDeckTitle } from '../lib/validation';
import { normalizeEntities, persistAppState } from '../lib/util';
import {
  CREATE_CARD,
  CREATE_DECK,
  RECEIVE_DECKS,
  SET_DECK_FORM_TITLE,
  SET_DECK_FORM_TITLE_ERROR,
} from '../actions';

export const reducer = combineReducers({ form, entities });

function form(state = { title: '', titleError: '' }, action) {
  switch (action.type) {
    case SET_DECK_FORM_TITLE: {
      return {
        ...state,
        title: action.title,
      };
    }

    case SET_DECK_FORM_TITLE_ERROR: {
      return {
        ...state,
        titleError: action.message,
      };
    }

    default: {
      return state;
    }
  }
}

function entities(state = {}, action) {
  switch (action.type) {
    case CREATE_DECK: {
      return {
        ...state,
        [action.deck.id]: action.deck,
      };
    }

    case RECEIVE_DECKS: {
      return {
        ...state,
        ...normalizeEntities(action.decks),
      };
    }

    case CREATE_CARD: {
      return {
        ...state,
        [action.card.deck]: entity(state[action.card.deck], action),
      };
    }

    default: {
      return state;
    }
  }
}

function entity(state = {}, action) {
  switch (action.type) {
    case CREATE_CARD: {
      return {
        ...state,
        cardCount: state.cardCount + 1,
      };
    }

    default: {
      return state;
    }
  }
}


export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks: decks || [],
  };
}

export function setDeckFormTitle(title) {
  return {
    type: SET_DECK_FORM_TITLE,
    title: title,
  };
}

export function setDeckFormTitleError(message) {
  return {
    type: SET_DECK_FORM_TITLE_ERROR,
    message: message,
  };
}

export function commitDeckForm() {
  return function (dispatch, getState) {
    const state = getState();
    const formData = getDeckFormData(state);

    if (!validateDeckTitle(formData.title)) {
      dispatch(setDeckFormTitleError('Invalid title'));
      return false;
    }

    if (getDeckByTitle(state, formData.title)) {
      dispatch(setDeckFormTitleError('There is already a deck with this title'));
      return false;
    }

    dispatch(setDeckFormTitle(''));
    dispatch(setDeckFormTitleError(''));
    dispatch(createDeck(formData.title));
    persistAppState(getState, dispatch);
    return true;
  };
}

function createDeck(title) {
  return {
    type: CREATE_DECK,
    deck: {
      id: uuid(),
      createdAt: Date.now(),
      title: title,
      cardCount: 0,
    },
  };
}


export function getAllDecks(state) {
  return Object.values(state.decks.entities).sort((a, b) => a.createdAt - b.createdAt);
}

export function getDeckFormData(state) {
  return state.decks.form;
}

export function getDeckById(state, id) {
  return state.decks.entities[id];
}

export function getDeckByTitle(state, title) {
  return getAllDecks(state).find(deck => deck.title.toLowerCase() === title.toLowerCase()) || null;
}

export function compareDecks(stateA, stateB) {
  return stateA.decks.entities === stateB.decks.entities;
}
