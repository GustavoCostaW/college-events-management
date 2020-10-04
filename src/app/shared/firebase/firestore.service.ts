import { Injectable } from '@angular/core';

import { FirestoreQuery } from './firestore.query';
import { FirebasePath } from './types/firebase-path';
import { FirebaseDoc } from './models/firebase-doc';
import { normalizePath } from './utils/firebase-utils';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup,
  AngularFirestoreDocument,
  DocumentReference,
  QueryGroupFn
} from '@angular/fire/firestore';

@Injectable()
export class FirestoreService<T extends FirebaseDoc> {
  constructor(protected afs: AngularFirestore) {}

  query(path: FirebasePath, q: FirestoreQuery): AngularFirestoreCollection<T> {
    return this.afs.collection<T>(normalizePath(path), (ref) => q.execute(ref));
  }

  queryGroup(name: string, q: FirestoreQuery): AngularFirestoreCollectionGroup<T> {
    return this._colGroup(name, (ref) => q.execute(ref));
  }

  add(path: FirebasePath, data: T): Promise<DocumentReference> {
    return this._col(path).add(data);
  }

  set(path: FirebasePath, data: T): Promise<void> {
    data = this._checkId(data);

    return this._col(path).doc(data.id).set(data);
  }

  doc(path: FirebasePath): AngularFirestoreDocument<T> {
    return this.afs.doc<T>(normalizePath(path));
  }

  writeBatch(path: string, data: T[]): Promise<void> {
    const batch = this.afs.firestore.batch();

    data.forEach((d) => batch.set(this._createRef(path, d), d));

    return batch.commit();
  }

  private _createRef(path: string, data: T): DocumentReference {
    data = this._checkId(data);

    return this.afs.doc<T>(normalizePath([path, data.id])).ref;
  }

  private _checkId(data: T): T & { id: string; } {
    return { ...data, id: data.id ?? this.afs.createId() };
  }

  private _col(path: FirebasePath): AngularFirestoreCollection<T> {
    return this.afs.collection<T>(normalizePath(path));
  }

  private _colGroup(collectionId: string, queryGroup: QueryGroupFn): AngularFirestoreCollectionGroup<T> {
    return this.afs.collectionGroup<T>(collectionId, queryGroup);
  }
}
