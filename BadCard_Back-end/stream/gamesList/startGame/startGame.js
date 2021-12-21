import { Subject, from } from 'rxjs';
import {
  map, withLatestFrom, tap, flatMap, filter,
} from 'rxjs/operators';
import { currentUserSubject } from 'stream/currentUser/currentUser';
import { fetchCards } from 'stream/decksList/decksList';
import { firestore as db } from 'lib/firebase';
import Game, { gameStates, converter } from 'game/game';
import Deck, { converter as deckConverter } from 'game/deck/deck';
import Player from 'game/player/player';

const newGameSubject = new Subject();
const newGameStartedSubject = new Subject();

const startGame = (name, deckID) => {
  const { id } = db.collection('games').doc();
  newGameSubject.next({ id, name, deckID });
};

newGameSubject.pipe(
  withLatestFrom(currentUserSubject.pipe(filter((user) => !!user))),
  flatMap(([{ id, name, deckID }, currentUser]) => fetchCards(deckID).pipe(
    map((cards) => [id, name, currentUser, cards]),
  )),
  tap((val) => console.log('newGameSubject game data =>', val)),
  map(([id, name, currentUser, { whiteCards, blackCards }]) => {
    const game = new Game(
      id,
      name,
      currentUser.id,
      currentUser.id,
      [new Player(currentUser.id, currentUser.displayName, Date.now(), currentUser.photoURL)],
      gameStates.playingCards,
    );

    const whiteDeck = new Deck(whiteCards);
    const blackDeck = new Deck(blackCards);

    whiteDeck.shuffle();
    blackDeck.shuffle();

    game.setWhiteCards(whiteDeck.cards);
    game.setBlackCards(blackDeck.cards);

    game.startNextRound();
    return [game, whiteDeck, blackDeck];
  }),
  tap((val) => console.log('newGameSubject init game =>', val)),
  flatMap(([game, whiteDeck, blackDeck]) => {
    const batch = db.batch();

    batch.set(db.collection('games').doc(game.id).withConverter(converter), game);
    batch.set(db.collection('decks').doc(game.id), {
      white: deckConverter.toFirestore(whiteDeck),
      black: deckConverter.toFirestore(blackDeck),
    });

    return from(batch.commit().then(() => game.id));
  }),
).subscribe(newGameStartedSubject);

export default startGame;

export {
  newGameStartedSubject,
};
