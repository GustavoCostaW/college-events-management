import { filter, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from './../../../../../models/course.model';
import {
  selectCoursesList,
  selectCoursesLoading,
} from '../../../store/selectors/courses.selectors';
import { logoutAction } from './../../../../../auth/store/actions/auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../../presentation/course-dialog/course-dialog.component';
import { insertCourseAction } from '../../../store/actions/courses.actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {
  constructor(private dialog: MatDialog, private store: Store) {}

  public courses$: Observable<Course[]>;
  public loading$: Observable<boolean>;

  ngOnInit() {
    this.courses$ = this.store.select(selectCoursesList);
    this.loading$ = this.store.select(selectCoursesLoading);
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }

  public newCourse(): void {
    this.dialog
      .open(CourseDialogComponent)
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => result)
      )
      .subscribe((course) => {
        this.store.dispatch(
          insertCourseAction({
            course: {
              ...course,
            },
          })
        );
      });
  }
}
