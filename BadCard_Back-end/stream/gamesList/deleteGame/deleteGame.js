import { Subject } from 'rxjs';
import {
  tap, withLatestFrom, filter,
} from 'rxjs/operators';
import { firestore as db } from 'lib/firebase';
import gamesListSubject from 'stream/gamesList/gamesList';
import { currentUserSubject } from 'stream/currentUser/currentUser';

const deleteGameSubject = new Subject();

const deleteGame = (id) => deleteGameSubject.next(id);

deleteGameSubject.pipe(
  withLatestFrom(currentUserSubject, gamesListSubject),
  filter(([id, currentUser, gamesList]) => gamesList.find((game) => game.id === id)?.ownerID === currentUser?.id),
  tap((val) => console.log('deleteGameSubject =>', val)),
).subscribe(([id]) => {
  db.collection('games').doc(id).delete();
});

export default deleteGame;
