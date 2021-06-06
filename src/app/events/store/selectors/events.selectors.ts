import { AppState } from './../../../app.state';
import { createSelector } from '@ngrx/store';

const selectEvents = (state: AppState) => state.events;

export const selectAllEvents = createSelector(selectEvents, (state) => {
  return state.events;
});

export const selectEventsLoading = createSelector(selectEvents, (state) => {
  return state.loading;
});

export const selectEventsLoaded = createSelector(selectEvents, (state) => {
  return state.loaded;
});

export const selectEventsError = createSelector(selectEvents, (state) => {
  return state.error;
});

export const selectFiltersEvents = createSelector(selectEvents, (state) => {
  return state.filters;
});
