import { Event } from './../../../models/events.model';
import { createAction, props } from '@ngrx/store';

export const loadEventsAction = createAction(
  '[Events] Load Events',
  (filters = {}) => filters
);

export const loadEventsSuccessAction = createAction(
  '[Events] Load Events Success',
  props<{ events: Event[] }>()
);

export const deleteEventAction = createAction(
  '[Events] Delete Event',
  props<{ id: string }>()
);

export const deleteEventActionSuccess = createAction(
  '[Events] Delete Event Success'
);

export const updateEventAction = createAction(
  '[Events] Update Event',
  props<{ event: Event }>()
);

export const updateEventActionSuccess = createAction(
  '[Events] Update Event Success'
);

export const insertEventAction = createAction(
  '[Events] Insert Event',
  props<{ event: Event }>()
);

export const insertEventActionSuccess = createAction(
  '[Events] Insert Events Success'
);
