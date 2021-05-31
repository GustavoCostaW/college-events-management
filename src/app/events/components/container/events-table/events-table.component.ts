import { EventDialogComponentMode } from './../../presentation/event-dialog/event-dialog.component';
import {
  updateEventAction,
  loadEventsAction,
  insertEventAction,
  deleteEventAction,
} from './../../../store/actions/events.actions';
import {
  selectAllEvents,
  selectEventsError,
  selectEventsLoaded,
  selectEventsLoading,
} from './../../../store/selectors/events.selectors';
import { selectActiveCourse } from '../../../../course/store/selectors/course.selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { EventDialogComponent } from '../../presentation/event-dialog/event-dialog.component';
import { Event } from '../../../../models/events.model';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsTableComponent implements OnInit {
  public events$: Observable<Event[]>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public error$: Observable<string>;

  public displayedColumns: string[] = [
    'eventName',
    'eventLocation',
    'eventDate',
  ];

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit() {
    this.store
      .select(selectActiveCourse)
      .pipe(
        filter((course) => !!course.id),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(loadEventsAction());
      });

    this.events$ = this.store.select(selectAllEvents);

    this.loading$ = this.store.select(selectEventsLoading);
    this.loaded$ = this.store.select(selectEventsLoaded);
    this.error$ = this.store.select(selectEventsError);
  }

  public changeRow(row: Event): void {
    this.dialog.open(EventDialogComponent, {
      data: row,
    }).afterClosed()
      .pipe(
        take(1),
        filter((result) => result)
      )
      .subscribe((result) => {
        if (result.mode === EventDialogComponentMode.DELETE) {
          this.store.dispatch(deleteEventAction({ id: result.id }));
        } else {
          this.store.dispatch(updateEventAction({ event: result }));
        }
      });
  }

  public newEvent(): void {
    this.dialog
      .open(EventDialogComponent)
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => result)
      )
      .subscribe((event) => {
        this.store.dispatch(
          insertEventAction({
            event: {
              ...event,
            },
          })
        );
      });
  }
}
