const cardTypes = {
  white: Symbol('white'),
  black: Symbol('black'),
};

// This can be further improved by generating a UID for each card
// just in case we have two cards with same text value as I am current
// using text prop as a unique property
class Card {
  constructor(type, text, pick = null, playerID = null) {
    this.text = text;
    this.type = type;
    this.pick = pick;
    this.playerID = playerID;
  }
}

export const converter = {
  toFirestore(card) {
    return {
      type: Object.entries(cardTypes).find(([, value]) => value === card.type)[0],
      text: card.text,
      pick: card.pick,
      playerID: card.playerID,
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Card(
      Object.entries(cardTypes).find(([key]) => key === data.type)[1],
      data.text,
      data.pick,
      data.playerID,
    );
  },
};

export default Card;

export {
  cardTypes,
};
