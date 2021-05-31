import { loginAction } from './auth/store/actions/auth.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCourseAction } from './course/store/actions/course.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(loginAction({ email: 'gustavo.costa.w@gmail.com', password: '123'}));
    this.store.dispatch(loadCourseAction({ id: 'bC7Lt9A2l6jlvslB2Enq'}));
  }
}
