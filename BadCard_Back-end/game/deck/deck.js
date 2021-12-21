import _shuffle from 'lib/shuffle';
import { converter as cardConverter } from 'game/card/card';

export default class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  get count() {
    return this.cards.length;
  }

  draw() {
    return this.cards.pop();
  }

  deal(count = 5) {
    return this.cards.splice(-1 * count, count).reverse();
  }

  shuffle() {
    _shuffle(this.cards);
  }
}

export const converter = {
  toFirestore(deck) {
    return {
      cards: deck.cards.map(cardConverter.toFirestore),
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Deck(
      data.cards.map((card) => cardConverter.fromFirestore({ data: () => card }, options)),
    );
  },
};
