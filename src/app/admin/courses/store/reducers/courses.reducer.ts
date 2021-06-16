import { Course } from './../../../../models/course.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CourseActions from '../actions/courses.actions';

export interface CoursesState {
  list: Course[];
  loading?: boolean;
  loaded?: boolean;
  error?: string;
}

export const initialState: CoursesState = {
  list: undefined,
  loaded: false,
};

const coursesReducerFactory = createReducer(
  initialState,
  on(CourseActions.loadCoursesAction, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: undefined,
    };
  }),
  on(CourseActions.loadCoursesSuccessAction, (state, { courses }) => {
    return {
      list: courses,
      loading: false,
      loaded: true,
      error: undefined,
    };
  })
);

export function coursesReducer(state: CoursesState, action: Action) {
  return coursesReducerFactory(state, action);
}
