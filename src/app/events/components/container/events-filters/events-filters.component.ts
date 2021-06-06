import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// models
import { Course } from './../../../../models/course.model';

// dialog
import { MatDialog } from '@angular/material/dialog';
import { SemesterSelectComponent } from '../../presentation/semester-select/semester-select.component';

// actions
import { logoutAction } from './../../../../auth/store/actions/auth.actions';
import { loadEventsAction } from './../../../store/actions/events.actions';

// selectors
import { selectFiltersEvents } from './../../../store/selectors/events.selectors';
import { selectActiveCourse } from './../../../../course/store/selectors/course.selectors';

// rxjs
import { take, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events-filters',
  templateUrl: './events-filters.component.html',
  styleUrls: ['./events-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsFiltersComponent {
  @Input() filters;
  public semesterFormGroup: FormGroup;
  public filters$: Observable<any>;
  public course$: Observable<Course>;

  constructor(public dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.filters$ = this.store.select(selectFiltersEvents);
    this.course$ = this.store.select(selectActiveCourse);
  }
  
  public selectSemester(): void {
    this.filters$
      .pipe(
        take(1),
        switchMap((filters) =>
          this.dialog
            .open(SemesterSelectComponent, {
              data: { ...filters, mode: 'FILTERS' },
            })
            .afterClosed()
            .pipe(take(1))
        )
      )
      .subscribe((filters) => {
        this.store.dispatch(
          loadEventsAction({
            filters,
          })
        );
      });
  }

  public exportPDF(): void {
    this.filters$
      .pipe(
        take(1),
        withLatestFrom(this.course$),
        switchMap(([filters, course]) =>
          this.dialog
            .open(SemesterSelectComponent, {
              data: { ...filters, mode: 'EXPORT', course },
            })
            .afterClosed()
            .pipe(take(1))
        )
      )
      .subscribe();
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }
}
