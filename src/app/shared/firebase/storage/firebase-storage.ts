import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { FirebasePath } from '../types/firebase-path';
import { normalizePath } from '../utils/firebase-utils';

@Injectable()
export class FirebaseStorage {
  constructor(private afs: AngularFireStorage) {}

  upload(
    path: FirebasePath,
    data: any,
    metadata?: firebase.storage.UploadMetadata
  ): AngularFireUploadTask {
    return this.afs.upload(normalizePath(path), data, metadata);
  }
  ref(path: FirebasePath): AngularFireStorageReference {
    return this.afs.ref(normalizePath(path));
  }
}
