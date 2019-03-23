export function reducer(state = {}, action) {
  switch (action.type) {
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

export function getAllDecks(state) {
  return Object.values(state.decks);
}
