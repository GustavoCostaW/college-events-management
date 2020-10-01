import {
  loadCourseAction,
  loadCourseSuccessAction,
} from './../actions/course.actions';
import { CoursesService } from '../../core/courses.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class CourseEffects {
  loadCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCourseAction),
      mergeMap((action) => {
        return this.coursesService
          .getCourse()
          .pipe(map((course) => loadCourseSuccessAction({ course })));
      })
    );
  });
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}
