import { Subject, interval } from 'rxjs';
import {
  tap, withLatestFrom, filter, map, switchMap, take, startWith,
} from 'rxjs/operators';
import currentGameSubject from 'stream/currentGame/currentGame';
import currentPlayerSubject from 'stream/currentGame/currentPlayer/currentPlayer';
import { firestore as db } from 'lib/firebase';
import Game, { converter, gameStates } from 'game/game';

const { countDownTime } = Game;
const nextRoundStartingSubject = new Subject();

currentGameSubject.pipe(
  filter((game) => game?.state === gameStates.winnerSelected && game.canPlayNextRound),
  switchMap(() => interval(1000).pipe(
    map((val) => countDownTime - (val + 1)),
    take(countDownTime),
    startWith(countDownTime),
  )),
).subscribe(nextRoundStartingSubject);

nextRoundStartingSubject.pipe(
  filter((count) => count === 0),
  withLatestFrom(
    currentGameSubject.pipe(filter((game) => !!game)),
    currentPlayerSubject,
  ),
  filter(([, game, player]) => game.state === gameStates.winnerSelected && game.cZarID === player?.id),
  map(([, game]) => game),
  tap((game) => game.startNextRound()),
  tap((val) => console.log('nextRoundSubject starts next round =>', val)),
).subscribe((game) => {
  db.collection('games').doc(game.id).withConverter(converter).set(game);
});

export default nextRoundStartingSubject;
