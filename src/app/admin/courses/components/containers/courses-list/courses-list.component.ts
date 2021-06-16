import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from './../../../../../models/course.model';
import { selectCoursesList, selectCoursesLoading } from '../../../store/selectors/courses.selectors';
import { logoutAction } from './../../../../../auth/store/actions/auth.actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {

  constructor(private store: Store){}

  public courses$: Observable<Course[]>;
  public loading$: Observable<boolean>;

  ngOnInit() {
    this.courses$ = this.store.select(selectCoursesList);
    this.loading$ = this.store.select(selectCoursesLoading);
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }

}
