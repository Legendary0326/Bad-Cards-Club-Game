import { Subject } from 'rxjs';
import {
  tap, withLatestFrom, filter, map,
} from 'rxjs/operators';
import currentGameSubject from 'stream/currentGame/currentGame';
import { firestore as db } from 'lib/firebase';
import { converter, gameStates } from 'game/game';

const pickWinnerSubject = new Subject();

const pickWinner = (card) => pickWinnerSubject.next(card);

pickWinnerSubject.pipe(
  filter((card) => !!card),
  withLatestFrom(
    currentGameSubject.pipe(filter((game) => !!game)),
  ),
  tap((val) => console.log('pickWinnerSubject emits =>', val)),
  filter(([, game]) => game.canPickWinner),
  tap(([card, game]) => game.pickWinner(card)),
  map(([, game]) => game),
  tap((game) => game.setState(gameStates.winnerSelected)),
  tap((val) => console.log('pickWinnerSubject picked winner =>', val)),
).subscribe((game) => {
  db.collection('games').doc(game.id).withConverter(converter).set(game);
});

export default pickWinner;
