import { Action, createReducer, on } from '@ngrx/store';
import * as CourseActions from '../actions/course.actions';

export interface CourseState {
  name: string;
  id: string;
  loading?: boolean;
  loaded?: boolean;
  error?: string;
}

export const initialState: CourseState = {
  name: undefined,
  id: undefined,
};

const courseReducerFactory = createReducer(
  initialState,
  on(CourseActions.loadCourseSuccessAction, (state, { course }) => {
    return {
      ...course,
    };
  })
);

export function courseReducer(state: CourseState, action: Action) {
  return courseReducerFactory(state, action);
}
