import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesService } from './core/courses.service';
import { loadCourseAction } from './store/actions/course.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(loadCourseAction());
  }
}
