import { EventsState } from './events/store/reducers/events.reducer';
import { courseReducer, CourseState } from './store/reducers/course.reducer';

export interface AppState {
  course: CourseState;
  events: EventsState;
}

export const startedStore = {
  course: courseReducer,
};
