import { Action, createReducer, on } from '@ngrx/store';
import * as EventsActions from '../actions/events.actions';
import { Event } from '../../../models/events.model';

export interface EventsState {
  events: Event[];
  loading?: boolean;
  loaded?: boolean;
  error?: string;
}

export const initialState: EventsState = {
  events: [],
  loaded: false,
};

const scoreboardReducer = createReducer(
  initialState,
  on(EventsActions.loadEventsAction, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(EventsActions.loadEventsSuccessAction, (state, { events }) => {
    console.log(events);
    return {
      events,
      loading: false,
      loaded: true,
      error: undefined,
    };
  })
);

export function reducer(state: EventsState, action: Action) {
  return scoreboardReducer(state, action);
}
