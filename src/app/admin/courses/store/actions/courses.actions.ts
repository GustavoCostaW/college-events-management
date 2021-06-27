import { User } from './../../../../models/user.model';
import { Course } from './../../../../models/course.model';
import { createAction, props } from '@ngrx/store';

export const loadCoursesAction = createAction('[Courses] Load Courses');

export const loadCoursesSuccessAction = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCourseUsers = createAction('[Courses] Load Course Users');

export const loadCourseUsersSuccess = createAction(
  '[Courses] Load Course Users Success',
  props<{ users: User[] }>()
);

export const insertCourseAction = createAction(
  '[Courses] Insert Course',
  props<{ course: Course }>()
);

export const insertCourseSuccessAction = createAction(
  '[Courses] Insert Course Success'
);
