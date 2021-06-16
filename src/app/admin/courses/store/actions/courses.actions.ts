import { Course } from './../../../../models/course.model';
import { createAction, props } from '@ngrx/store';

export const loadCoursesAction = createAction(
  '[Courses] Load Courses'
);

export const loadCoursesSuccessAction = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);
