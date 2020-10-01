import { EventsService } from './../../../core/events.service';
import {
  deleteEventAction,
  deleteEventActionSuccess,
  insertEventAction,
  insertEventActionSuccess,
  loadEventsAction,
  loadEventsSuccessAction,
  updateEventAction,
  updateEventActionSuccess,
} from './../actions/events.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable()
export class EventsEffects {
  loadEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEventsAction),
      mergeMap((action) => {
        return this.eventsService
          .getEventsByCourse()
          .pipe(map((events) => loadEventsSuccessAction({ events })));
      })
    );
  });

  updateEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateEventAction),
      mergeMap((action) => {
        return this.eventsService
          .updateEvent(action.event)
          .pipe(
            switchMap((event) =>
              from([updateEventActionSuccess(), loadEventsAction()])
            )
          );
      })
    );
  });

  deleteEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteEventAction),
      mergeMap((action) => {
        return this.eventsService
          .deleteEvent(action.id)
          .pipe(
            switchMap((event) =>
              from([deleteEventActionSuccess(), loadEventsAction()])
            )
          );
      })
    );
  });

  insertEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(insertEventAction),
      mergeMap((action) => {
        return this.eventsService
          .insertEvent(action.event)
          .pipe(
            switchMap((event) =>
              from([insertEventActionSuccess(), loadEventsAction()])
            )
          );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}
}
