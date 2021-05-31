import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { loginAction, loginSuccessAction } from '../actions/auth.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  loginAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      mergeMap(() => of({id: 'fXB4q9fLBxI1xdXU3lGz', email: 'gustavo.costa.w@gmail.com'})),
      map(user => loginSuccessAction({user}))
    );
  });
  constructor(
    private actions$: Actions
  ) {}
}
