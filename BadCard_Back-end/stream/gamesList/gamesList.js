import {
  ReplaySubject, BehaviorSubject, Subject, combineLatest,
} from 'rxjs';
import {
  map, switchMap, tap, take, distinctUntilKeyChanged, filter, distinctUntilChanged, takeUntil, endWith,
} from 'rxjs/operators';
import { currentUserSubject, isAuthenticatedSubject } from 'stream/currentUser/currentUser';
import { firestore as db } from 'lib/firebase';
import { doc, collection } from 'rxfire/firestore';
import { converter } from 'game/game';

const gamesListSubject = new ReplaySubject(1);
const gamesListLoadedSubject = new BehaviorSubject(false);
const selectedGameIDSubject = new ReplaySubject(1);
const selectedGameExistSubject = new Subject();

const selectGame = (id) => selectedGameIDSubject.next(id);

combineLatest([
  selectedGameIDSubject.pipe(distinctUntilChanged()),
  isAuthenticatedSubject.pipe(distinctUntilChanged()),
]).pipe(
  filter(([id, isAuthenticated]) => id && isAuthenticated),
  switchMap(([id]) => doc(db.collection('games').doc(id)).pipe(
    map((snapshot) => snapshot.exists),
    takeUntil(isAuthenticatedSubject.pipe(
      filter((val) => val === false),
    )),
  )),
).subscribe(selectedGameExistSubject);

currentUserSubject.pipe(
  filter((user) => !!user),
  map(({ id }) => db.collection('games').where(`players.${id}.id`, '==', id)),
  switchMap((ref) => collection(ref.withConverter(converter)).pipe(
    takeUntil(isAuthenticatedSubject.pipe(
      filter((val) => val === false),
    )),
    endWith([]),
  )),
  map((snapshots) => snapshots.map((snapshot) => snapshot.data())),
  distinctUntilKeyChanged('length'),
  tap((val) => console.log('gamesListSubject =>', val)),
).subscribe(gamesListSubject);

gamesListSubject.pipe(
  take(1),
  map(() => true),
).subscribe(gamesListLoadedSubject);

export default gamesListSubject;

export {
  selectGame,
  selectedGameIDSubject,
  selectedGameExistSubject,
  gamesListLoadedSubject,
};
