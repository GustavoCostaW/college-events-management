import {
  loadCoursesAction,
  loadCoursesSuccessAction,
  insertCourseAction,
  insertCourseSuccessAction,
  loadCourseUsers,
  loadCourseUsersSuccess,
} from './../actions/courses.actions';
import { CoursesService } from './../../../../core/courses.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CoursesEffects {
  loadCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCoursesAction),
      mergeMap(() => {
        return this.coursesService
          .getCourses()
          .pipe(switchMap((courses) => of(loadCoursesSuccessAction({ courses }), loadCourseUsers())));
      })
    );
  });

  loadCourseUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCourseUsers),
      mergeMap(() => {
        return this.coursesService
          .getCoursesUsers()
          .pipe(map((users) => loadCourseUsersSuccess({ users })));
      })
    );
  });

  insertCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(insertCourseAction),
      mergeMap((action) => {
        return this.coursesService
          .insertCourse(action.course)
          .pipe(map(() => insertCourseSuccessAction()));
      })
    );
  });
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
