import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { CoursesEffects } from './store/effects/courses.effects';
import { CoursesListComponent } from './components/containers/courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
  },
];

@NgModule({
  declarations: [
    CoursesListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([CoursesEffects])
  ]
})
export class CoursesModule { }
