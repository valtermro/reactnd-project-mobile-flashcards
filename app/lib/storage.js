function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function readAppState() {
  await delay(2000);

  return {
    decks: {
      '00c2223f-9a65-47f2-b3b8-86782cae2edf': {
        id: '00c2223f-9a65-47f2-b3b8-86782cae2edf',
        title: 'Common knowledge',
      },
      '11c2223f-9a65-47f2-b3b8-86782cae2edf': {
        id: '11c2223f-9a65-47f2-b3b8-86782cae2edf',
        title: 'New Deck 1',
      },
      '22c2223f-9a65-47f2-b3b8-86782cae2edf': {
        id: '22c2223f-9a65-47f2-b3b8-86782cae2edf',
        title: 'New Deck 2',
      },
      '22c2223g-9a65-47f2-b3b8-86782cae2edf': {
        id: '22c2223g-9a65-47f2-b3b8-86782cae2edf',
        title: 'New Deck 3',
      },
      '22c2223h-9a65-47f2-b3b8-86782cae2edf': {
        id: '22c2223h-9a65-47f2-b3b8-86782cae2edf',
        title: 'New Deck 4',
      },
      '22c2223i-9a65-47f2-b3b8-86782cae2edf': {
        id: '22c2223i-9a65-47f2-b3b8-86782cae2edf',
        title: 'New Deck 5',
      },
      '22c2223j-9a65-47f2-b3b8-86782cae2edf': {
        id: '22c2223j-9a65-47f2-b3b8-86782cae2edf',
        title: 'New Deck 6',
      },
      '22c2223k-9a65-47f2-b3b8-86782cae2edf': {
        id: '22c2223k-9a65-47f2-b3b8-86782cae2edf',
        title: 'New Deck 7',
      },
    },

    cards: {
      '7995174b-6666-4313-9cc1-6ad008e987fa': {
        id: '7995174b-6666-4313-9cc1-6ad008e987fa',
        deck: '00c2223f-9a65-47f2-b3b8-86782cae2edf',
        question: "What's the answer to the universe?",
        answer: '42',
      },
      '8885174b-6666-4313-9cc1-6ad008e987fa': {
        id: '8885174b-6666-4313-9cc1-6ad008e987fa',
        deck: '00c2223f-9a65-47f2-b3b8-86782cae2edf',
        question: '2 + 2 = ?',
        answer: '4',
      },
    },
  };
}
