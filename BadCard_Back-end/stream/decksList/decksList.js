import {
  from, ReplaySubject,
} from 'rxjs';
import {
  map, filter, flatMap, tap, share,
} from 'rxjs/operators';
import Card, { cardTypes } from 'game/card/card';

const baseURL = 'https://cards-a-humanity.herokuapp.com/api/v1';
const setsURL = `${baseURL}/packs`;
const cardsURL = (id) => `${baseURL}/pack/${id}`;

const defaultDeckSubject = new ReplaySubject();
const decksListSubject = new ReplaySubject();

from(fetch(setsURL)).pipe(
  filter((response) => response),
  flatMap((response) => response.json()),
  map(({ packs }) => packs
    .filter(({ quantity }) => quantity.black && quantity.white > 10)
    .sort(({ id }) => (id === 'main_deck' ? -1 : 0))),
  tap((response) => console.log('decksListSubject =>', response)),
).subscribe(decksListSubject);

decksListSubject.pipe(
  map((decks) => decks.find(({ id }) => id.toLowerCase() === 'main_deck')),
  filter((val) => !!val),
  tap((response) => console.log('defaultDeckSubject =>', response)),
).subscribe(defaultDeckSubject);

const fetchCards = (deckID) => from(fetch(cardsURL(deckID))).pipe(
  filter((response) => response),
  flatMap((response) => response.json()),
  tap((response) => console.log('cardsResponseObservable =>', response)),
  map(({ white, black }) => ({
    whiteCards: white.map((text) => new Card(cardTypes.white, text)),
    blackCards: black.map(({ content, pick }) => new Card(cardTypes.black, content, pick)),
  })),
  share(),
);

export {
  decksListSubject,
  defaultDeckSubject,
  fetchCards,
};
