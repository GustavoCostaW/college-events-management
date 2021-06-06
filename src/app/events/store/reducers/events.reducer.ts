import { Action, createReducer, on } from '@ngrx/store';
import * as EventsActions from '../actions/events.actions';
import { Event } from '../../../models/events.model';

export interface EventsState {
  events: Event[];
  loading?: boolean;
  loaded?: boolean;
  error?: string;
  filters?: {
    semester: string;
    year: string;
  };
}

export const initialState: EventsState = {
  events: [],
  loaded: false,
};

const eventsReducerFactory = createReducer(
  initialState,
  on(EventsActions.loadEventsAction, (state, { filters }) => {
    return {
      ...state,
      loading: true,
      filters,
    };
  }),
  on(EventsActions.loadEventsSuccessAction, (state, { events }) => {
    return {
      ...state,
      events,
      loading: false,
      loaded: true,
      error: undefined,
    };
  })
);

export function eventsReducer(state: EventsState, action: Action) {
  return eventsReducerFactory(state, action);
}
