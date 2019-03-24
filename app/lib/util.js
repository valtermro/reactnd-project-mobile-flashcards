import { pushAppNotification, popAppNotification } from '../store';
import { mergeAppState } from './storage';
import { getAllDecks } from '../decks/store';
import { getAllCards } from '../cards/store';

const MAX_HEADER_TITLE_LENGTH = 36;

export function trimHeaderTitle(title) {
  if (title.length <= MAX_HEADER_TITLE_LENGTH) {
    return title;
  }

  return title.slice(0, MAX_HEADER_TITLE_LENGTH).trim() + '...';
}

export function normalizeEntities(entities) {
  return entities.reduce((accum, entity) => {
    accum[entity.id] = entity;
    return accum;
  }, {});
}

export async function persistAppState(getState, storeDispatch) {
  try {
    const state = getState();
    await mergeAppState({ decks: getAllDecks(state), cards: getAllCards(state)});
  } catch (error) {
    storeDispatch(pushAppNotification(
      'Failed to persist your data',
      'Try again',
      () => {
        storeDispatch(popAppNotification());

        // Just let the user keep trying until he/she gives up and restart the app.
        // Not the best user experience but this is not expected to happen so often,
        // if ever, so let's roll with it.
        persistAppState(getState, storeDispatch);
      }
    ));
  }
}
