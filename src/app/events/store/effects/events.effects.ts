import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadEventsAction } from '../actions/events.actions';

@Injectable()
export class EventsEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEventsAction),
      mergeMap(() => {})
    )
  );

  constructor(private actions$: Actions) {}
}
