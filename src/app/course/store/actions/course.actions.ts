import { Course } from '../../../models/course.model';
import { createAction, props } from '@ngrx/store';

export const loadCourseAction = createAction(
  '[Course] Load Course', 
  props<{id: string}>()
);

export const loadCourseSuccessAction = createAction(
  '[Course] Load Course Success',
  props<{ course: Course }>()
);
