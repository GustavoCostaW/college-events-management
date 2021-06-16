import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { selectCurrentUser } from './store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminOnlyGuard implements CanActivate {
  constructor(public auth: AngularFireAuth, private store: Store, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {
    return this.store.select(selectCurrentUser).pipe(
      filter(user => user.auth),
      map((user) => user.role === 'admin'),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['events'])
        }
      }),
      take(1)
    );
  }
}
