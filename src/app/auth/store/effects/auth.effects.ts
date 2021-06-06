import {
  loginFromSessionAction,
  logoutAction,
  logoutActionSuccess,
} from './../actions/auth.actions';
import { loadCourseAction } from './../../../course/store/actions/course.actions';
import { AuthService } from './../../../core/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { loginAction, loginSuccessAction } from '../actions/auth.actions';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  loginAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password)
      ),
      switchMap((user) => this.authService.findUserById(user.id)),
      switchMap((user) =>
        from([
          loadCourseAction({ id: user.course_id }),
          loginSuccessAction({
            user,
          }),
        ])
      ),
      tap(() => this.router.navigate(['events']))
    );
  });

  loginFromSessionAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginFromSessionAction),
      switchMap((user) => this.authService.findUserById(user.id)),
      switchMap((user) =>
        from([
          loadCourseAction({ id: user.course_id }),
          loginSuccessAction({
            user,
          }),
        ])
      ),
    );
  });

  logoutAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logoutAction),
      exhaustMap(() => this.authService.logout()),
      tap(() => this.router.navigate(['login'])),
      map(() => logoutActionSuccess())
    );
  });
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
