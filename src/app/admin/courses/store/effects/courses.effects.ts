import {
  loadCoursesAction,
  loadCoursesSuccessAction,
  insertCourseAction,
  insertCourseSuccessAction,
} from './../actions/courses.actions';
import { CoursesService } from './../../../../core/courses.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CoursesEffects {
  loadCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCoursesAction),
      mergeMap(() => {
        return this.coursesService
          .getCourses()
          .pipe(map((courses) => loadCoursesSuccessAction({ courses })));
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
