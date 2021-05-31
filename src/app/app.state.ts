// states
import { EventsState } from './events/store/reducers/events.reducer';
// states and reducers
import { authReducer, AuthState } from './auth/store/reducers/auth.reducer';
import { courseReducer, CourseState } from './course/store/reducers/course.reducer';

export interface AppState {
  course: CourseState;
  events: EventsState;
  auth: AuthState
}

export const startedStore = {
  auth: authReducer,
  course: courseReducer,
};
