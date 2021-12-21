import { Subject, from, merge } from 'rxjs';
import {
  tap, withLatestFrom, filter, map, pairwise, concatMap, switchMapTo, take,
} from 'rxjs/operators';
import currentGameSubject from 'stream/currentGame/currentGame';
import currentPlayerSubject from 'stream/currentGame/currentPlayer/currentPlayer';
import { firestore as db } from 'lib/firebase';
import { converter } from 'game/game';

const leaveGameSubject = new Subject();
const playerLeaveGameSubject = new Subject();
const removePlayerSubject = new Subject();

const leaveGame = () => leaveGameSubject.next();
const removePlayer = (player) => removePlayerSubject.next(player);

merge(
  removePlayerSubject,
  leaveGameSubject.pipe(
    switchMapTo(currentPlayerSubject.pipe(filter((player) => player), take(1))),
  ),
).pipe(
  withLatestFrom(currentGameSubject.pipe(filter((game) => !!game))),
  filter(([player, game]) => game.ownerID !== player.id),
  tap(([player, game]) => game.removePlayer(player)),
  tap((val) => console.log('leaveGameSubject remove player =>', val)),
).subscribe(([, game]) => {
  db.collection('games').doc(game.id).withConverter(converter).set(game);
});

// player leaves a game
currentGameSubject.pipe(
  filter((game) => !!game),
  map((game) => game.players),
  pairwise(),
  map(([prev, curr]) => prev.filter((prevItem) => !curr.find((currItem) => prevItem.id === currItem.id))),
  filter((players) => players.length),
  tap((val) => console.log('playerLeaveGameSubject players left game =>', val)),
  concatMap((players) => from(players)),
).subscribe(playerLeaveGameSubject);

export default leaveGame;

export {
  removePlayer,
  playerLeaveGameSubject,
};
