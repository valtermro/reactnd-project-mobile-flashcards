export function receiveCards(cards) {
  return {
    type: 'RECEIVE_CARDS',
    cards: cards,
  };
}


export function reducer(state = {}, action) {
  switch (action.type) {
    case 'RECEIVE_CARDS': {
      return {
        ...state,
        ...action.cards,
      };
    }

    default: {
      return state;
    }
  }
}

export function getAllCards(state) {
  return Object.values(state.cards);
}

export function getCardsByDeck(state, deckId) {
  return getAllCards(state).filter(card => card.deck === deckId);
}
