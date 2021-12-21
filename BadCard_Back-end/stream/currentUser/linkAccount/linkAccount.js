import {
  Subject, of, BehaviorSubject, from,
} from 'rxjs';
import {
  map, filter, tap, flatMap, catchError,
} from 'rxjs/operators';
import { auth } from 'lib/firebase';
import { authStateSubject } from 'stream//currentUser/currentUser';

// //-------------- Link anonymous account and update user profile
const accountLinkedSubject = new Subject();
const linkAccountSubject = new Subject();
const linkAccountStateSubject = new BehaviorSubject({ error: undefined, isLoading: false });
const linkAccount = (provider) => linkAccountSubject.next(provider);

linkAccountSubject.pipe(
  tap(() => linkAccountStateSubject.next({ error: undefined, isLoading: true })),
  flatMap((provider) => from(auth.currentUser.linkWithPopup(provider)).pipe(
    map((result) => result.user?.providerData?.[0]),
    filter((data) => data?.displayName),
    flatMap((data) => auth.currentUser.updateProfile({
      displayName: data.displayName,
      photoURL: data.photoURL,
    })),
    tap(() => authStateSubject.next(auth.currentUser)),
    map(() => ({ error: undefined, isLoading: false, isLinked: true })),
    catchError((error) => of({ error, isLoading: false })),
    tap((val) => console.log('linkAccountSubject =>', val)),
  )),
).subscribe(linkAccountStateSubject);

linkAccountStateSubject.pipe(
  filter(({ isLinked }) => isLinked),
).subscribe(accountLinkedSubject);

export default linkAccount;

export {
  linkAccountStateSubject,
  accountLinkedSubject,
};
