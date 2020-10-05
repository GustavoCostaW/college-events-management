import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { FirebaseStorage } from './storage/firebase-storage';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AngularFireModule, FirebaseOptions, FIREBASE_OPTIONS } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

@NgModule({
  providers: [AuthService, FirestoreService, FirebaseStorage],
  imports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule
    // .enablePersistence({ synchronizeTabs: true })
  ]
})
export class FirebaseModule {
  static withConfig(options: FirebaseOptions): ModuleWithProviders<FirebaseModule> {
    return {
      ngModule: FirebaseModule,
      providers: [ { provide: FIREBASE_OPTIONS, useValue: options } ]
    };
  }
}
