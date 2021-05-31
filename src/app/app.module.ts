import { AngularFirestoreModule } from '@angular/fire/firestore';
import { startedStore } from './app.state';
import { firebaseConfig } from './firebase.config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment'; // Angular CLI environment
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './course/store/effects/course.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthEffects } from './auth/store/effects/auth.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthModule,
    StoreModule.forRoot(startedStore),
    EffectsModule.forRoot([AuthEffects ,CourseEffects]),
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25, // Retains last 25 states
    // }),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
