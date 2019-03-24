import uuid from 'uuid';
import { combineReducers } from 'redux';
import { validateDeckTitle } from '../lib/validation';

export const reducer = combineReducers({ form, entities });

function form(state = { title: '', titleError: '' }, action) {
  switch (action.type) {
    case 'SET_DECK_FORM_TITLE': {
      return {
        ...state,
        title: action.title,
      };
    }

    case 'SET_DECK_FORM_TITLE_ERROR': {
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
    case 'CREATE_DECK': {
      return {
        ...state,
        [action.deck.id]: action.deck,
      };
    }

    case 'RECEIVE_DECKS': {
      return {
        ...state,
        ...action.decks,
      };
    }

    default: {
      return state;
    }
  }
}


export function receiveDecks(decks) {
  return {
    type: 'RECEIVE_DECKS',
    decks: decks,
  };
}

export function setDeckFormTitle(title) {
  return {
    type: 'SET_DECK_FORM_TITLE',
    title: title,
  };
}

export function setDeckFormTitleError(message) {
  return {
    type: 'SET_DECK_FORM_TITLE_ERROR',
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
    return true;
  };
}

function createDeck(title) {
  return {
    type: 'CREATE_DECK',
    deck: {
      id: uuid(),
      title: title,
      cardCount: 0,
    },
  };
}


export function getAllDecks(state) {
  return Object.values(state.decks.entities);
}

export function getDeckFormData(state) {
  return state.decks.form;
}

export function getDeckByTitle(state, title) {
  return getAllDecks(state).find(deck => deck.title.toLowerCase() === title.toLowerCase()) || null;
}
