import uuid from 'uuid';
import { combineReducers } from 'redux';
import { validateCardQuestion, validateCardAnswer } from '../lib/validation';
import { normalizeEntities, persistAppState } from '../lib/util';
import {
  CREATE_CARD,
  RECEIVE_CARDS,
  SET_CARD_FORM_ANSWER,
  SET_CARD_FORM_QUESTION,
  SET_CARD_FORM_ANSWER_ERROR,
  SET_CARD_FORM_QUESTION_ERROR,
} from '../actions';

export const reducer = combineReducers({ form, entities });

function form(
  state = { question: '', questionError: '', answer: '', answerError: '' },
  action
) {
  switch (action.type) {
    case SET_CARD_FORM_QUESTION: {
      return {
        ...state,
        question: action.question,
      };
    }

    case SET_CARD_FORM_QUESTION_ERROR: {
      return {
        ...state,
        questionError: action.message,
      };
    }

    case SET_CARD_FORM_ANSWER: {
      return {
        ...state,
        answer: action.answer,
      };
    }

    case SET_CARD_FORM_ANSWER_ERROR: {
      return {
        ...state,
        answerError: action.message,
      };
    }

    default: {
      return state;
    }
  }
}

function entities(state = {}, action) {
  switch (action.type) {
    case CREATE_CARD: {
      return {
        ...state,
        [action.card.id]: action.card,
      };
    }

    case RECEIVE_CARDS: {
      return {
        ...state,
        ...normalizeEntities(action.cards),
      };
    }

    default: {
      return state;
    }
  }
}


export function receiveCards(cards) {
  return {
    type: RECEIVE_CARDS,
    cards: cards || [],
  };
}

export function setCardFormQuestion(question) {
  return {
    type: SET_CARD_FORM_QUESTION,
    question: question,
  };
}

export function setCardFormQuestionError(message) {
  return {
    type: SET_CARD_FORM_QUESTION_ERROR,
    message: message,
  };
}

export function setCardFormAnswer(answer) {
  return {
    type: SET_CARD_FORM_ANSWER,
    answer: answer,
  };
}

export function setCardFormAnswerError(message) {
  return {
    type: SET_CARD_FORM_ANSWER_ERROR,
    message: message,
  };
}

export function commitCardForm(deckId) {
  return function (dispatch, getState) {
    const state = getState();
    const formData = getCardFormData(state);
    let failedValidation = false;

    if (!validateCardQuestion(formData.question)) {
      dispatch(setCardFormQuestionError('Invalid question'));
      failedValidation = true;
    }
    if (!validateCardAnswer(formData.answer)) {
      dispatch(setCardFormAnswerError('Invalid answer'));
      failedValidation = true;
    }

    const existingCard = getCardByQuestion(state, formData.question);
    if (existingCard && existingCard.deck === deckId) {
      dispatch(setCardFormQuestionError('There is already a question like this in this deck'));
      failedValidation = true;
    }

    if (failedValidation) {
      return false;
    }

    dispatch(setCardFormQuestion(''));
    dispatch(setCardFormQuestionError(''));
    dispatch(setCardFormAnswer(''));
    dispatch(setCardFormAnswerError(''));
    dispatch(createCard(deckId, formData.question, formData.answer));
    persistAppState(getState, dispatch);
    return true;
  };
}

function createCard(deckId, question, answer) {
  return {
    type: CREATE_CARD,
    card: {
      id: uuid(),
      deck: deckId,
      question: question,
      answer: answer,
    },
  };
}

export function getCardFormData(state) {
  return state.cards.form;
}

export function getAllCards(state) {
  return Object.values(state.cards.entities);
}

export function getCardsByDeck(state, deckId) {
  return getAllCards(state).filter(card => card.deck === deckId);
}

function getCardByQuestion(state, question) {
  return getAllCards(state).find(card => card.question.toLowerCase() === question.toLowerCase()) || null;
}

export function compareCards(stateA, stateB) {
  return stateA.cards.entities === stateB.cards.entities;
}
