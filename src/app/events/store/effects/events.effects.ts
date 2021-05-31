import { selectCurrentUser } from './../../../auth/store/selectors/auth.selectors';
import { selectActiveCourse } from '../../../course/store/selectors/course.selectors';
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
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { from } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class EventsEffects {

  public loadEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEventsAction),
      withLatestFrom(this.store.select(selectActiveCourse)),
      mergeMap(([action, {id}]) => {
        return this.eventsService
          .getAllEventsByCourse(id)
          .pipe(map((events) => loadEventsSuccessAction({ events })));
      })
    );
  });

  public updateEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateEventAction),
      withLatestFrom(this.store.select(selectActiveCourse)),
      mergeMap(([action, course]) => {
        return this.eventsService
          .updateEvent(action.event, course.id)
          .pipe(
            switchMap(() =>
              from([updateEventActionSuccess(), loadEventsAction()])
            )
          );
      })
    );
  });

  public deleteEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteEventAction),
      withLatestFrom(this.store.select(selectActiveCourse)),
      mergeMap(([action, {id}]) => {
        return this.eventsService
          .deleteEvent(action.id, id)
          .pipe(
            switchMap(() =>
              from([deleteEventActionSuccess(), loadEventsAction()])
            )
          );
      })
    );
  });

  public insertEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(insertEventAction),
      withLatestFrom(this.store.select(selectActiveCourse), this.store.select(selectCurrentUser)),
      mergeMap(([action, course, user]) => {
        return this.eventsService
          .insertEvent(action.event, course.id, user.id)
          .pipe(
            switchMap(() =>
              from([insertEventActionSuccess(), loadEventsAction()])
            )
          );
      })
    );
  });
  constructor(
    private actions$: Actions,
    private eventsService: EventsService,
    private store: Store
  ) {}
}
