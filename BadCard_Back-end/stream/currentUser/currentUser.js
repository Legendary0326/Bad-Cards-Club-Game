import { Subject, ReplaySubject } from 'rxjs';
import {
  map, filter, take, delay, tap, share, withLatestFrom,
} from 'rxjs/operators';
import { auth } from 'lib/firebase';
import { authState } from 'rxfire/auth';

const authStateSubject = new Subject();
const currentUserSubject = new ReplaySubject(1);
const authStateDeterminedSubject = new Subject();
const isAuthenticatedSubject = new ReplaySubject(1);

authState(auth).subscribe(authStateSubject);

// //-------------- Auth state
authStateSubject.pipe(
  map((user) => !!user),
  tap((val) => console.log('isAuthenticatedSubject =>', val)),
).subscribe(isAuthenticatedSubject);

isAuthenticatedSubject.pipe(
  take(1),
  map(() => true),
  delay(500),
).subscribe(authStateDeterminedSubject);

// //-------------- Current user
const buildUser = (user) => ({
  id: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  isAnonymous: user.isAnonymous || false,
});

authStateSubject.pipe(
  map((user) => (user ? buildUser(user) : undefined)),
  tap((val) => console.log('currentUserSubject =>', val)),
).subscribe(currentUserSubject);

// //-------------- Delete anonymous user on signout
const lastKnownUserObservable = authStateSubject.pipe(
  filter((user) => !!user),
  share(),
);

isAuthenticatedSubject.pipe(
  withLatestFrom(lastKnownUserObservable),
  filter(([isAuthenticated, user]) => !isAuthenticated && user.isAnonymous),
).subscribe(([, user]) => user.delete());

export {
  authStateSubject,
  currentUserSubject,
  isAuthenticatedSubject,
  authStateDeterminedSubject,
};
