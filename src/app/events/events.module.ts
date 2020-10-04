import { EventsEffects } from './store/effects/events.effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './../shared/shared.module';
import { EventsTableComponent } from './components/container/events-table/events-table.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as eventsReducer from './store/reducers/events.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventDialogComponent } from './components/presentation/event-dialog/event-dialog.component';
import { EventGalleryUploadComponent } from './components/container/event-gallery-upload/event-gallery-upload.component';

const routes: Routes = [
  {
    path: '',
    component: EventsTableComponent,
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('events', eventsReducer.reducer),
    EffectsModule.forFeature([EventsEffects]),
  ],
  declarations: [
    EventsTableComponent,
    EventDialogComponent,
    EventGalleryUploadComponent,
  ],
})
export class EventsModule {}
