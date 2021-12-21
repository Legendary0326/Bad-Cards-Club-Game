import { Subject } from 'rxjs';
import {
  tap, withLatestFrom, filter, map,
} from 'rxjs/operators';
import currentGameSubject from 'stream/currentGame/currentGame';
import { firestore as db } from 'lib/firebase';
import { converter } from 'game/game';
import currentPlayerSubject from 'stream/currentGame/currentPlayer/currentPlayer';

const swapCardsSubject = new Subject();

const swapCards = () => swapCardsSubject.next();

swapCardsSubject.pipe(
  withLatestFrom(currentGameSubject, currentPlayerSubject),
  map(([, game, player]) => [game, player]),
  filter(([game, player]) => game && player),
  tap((val) => console.log('swapCardsSubject emits =>', val)),
  filter(([game, player]) => game.canSwapCards(player)),
  tap(([game, player]) => game.swapPlayerCards(player)),
  map(([game]) => game),
  tap((val) => console.log('swapCardsSubject swapped cards =>', val)),
).subscribe((game) => {
  db.collection('games').doc(game.id).withConverter(converter).set(game);
});

export default swapCards;
