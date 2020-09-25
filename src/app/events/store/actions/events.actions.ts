import { createAction, props } from '@ngrx/store';
import { Event } from '../../model/event.model';

export const addEventAction = createAction(
  '[Events] Add Event',
  props<Event>()
);

export const loadEventsAction = createAction(
  '[Events] Load Events',
  props<Event>()
);
