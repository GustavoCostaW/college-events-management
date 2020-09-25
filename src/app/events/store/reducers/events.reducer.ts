import { Action, createReducer, on } from '@ngrx/store';
import * as EventsActions from '../actions/events.actions';

export interface EventsState {
    data: any[]
  }

export const initialState: EventsState = {
    data: []
  };

  const scoreboardReducer = createReducer(
    initialState,
    on(EventsActions.addEventAction, (state, {name}) => {

      
      return {
        ...state,
        data: [
          ...state.data,
          {
            name
          }
        ]
      }
    } )
  );
  
  export function reducer(state: EventsState, action: Action) {
    return scoreboardReducer(state, action);
  }