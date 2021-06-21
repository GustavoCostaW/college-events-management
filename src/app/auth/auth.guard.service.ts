import { AuthService } from './../core/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { selectCurrentUser } from './store/selectors/auth.selectors';
import { loginFromSessionAction } from './store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AngularFireAuth,
    private store: Store,
    private authService: AuthService
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {
    return this.auth.user.pipe(
      withLatestFrom(this.store.select(selectCurrentUser)),
      tap(([user, currentUser]) => {
        if (user && currentUser.auth === false) {
          this.store.dispatch(
            loginFromSessionAction({ email: user.email, id: user.uid })
          );
        }
      }),
      map(([user, currentUser]) => {
        if (!!user && currentUser.auth === false) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
