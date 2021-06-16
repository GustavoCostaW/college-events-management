import { AuthGuard } from './../auth/auth.guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as coursesReducer from './courses/store/reducers/courses.reducer';


const routes: Routes = [
  {
    path: 'courses',
    canActivate: [AuthGuard],
    loadChildren: () => import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('admin', {
      courses: coursesReducer.coursesReducer
    }),
  ]
})
export class AdminModule { }
