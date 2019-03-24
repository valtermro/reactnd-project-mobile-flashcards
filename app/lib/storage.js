function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function readAppState() {
  await delay(2000);

  return {
    decks: {},

    cards: {},
  };
}
