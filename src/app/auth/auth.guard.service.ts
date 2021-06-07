import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';

import { selectCurrentUser } from './store/selectors/auth.selectors';
import { loginFromSessionAction } from './store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {
    return this.auth.user.pipe(
      withLatestFrom(this.store.select(selectCurrentUser)),
      take(1),
      map(([user, currentUser]) => { 
        if (user && currentUser.auth === false) {
          this.store.dispatch(
            loginFromSessionAction({ email: user.email, id: user.uid })
          );

          if (next.routeConfig.path === 'login') {
            this.router.navigate(['events']);
          }
        }

        return true;
      })
    )
  }
}
