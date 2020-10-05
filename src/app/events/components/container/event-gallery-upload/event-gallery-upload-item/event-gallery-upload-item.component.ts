import { ImageFileData, resizeImage } from './../../../../../shared/utilities';
import {
  FirebaseStorage,
  FirestoreService,
} from '../../../../../shared/firebase';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-event-gallery-upload-item',
  templateUrl: './event-gallery-upload-item.component.html',
  styleUrls: ['./event-gallery-upload-item.component.scss'],
})
export class EventGalleryUploadItemComponent implements OnInit, OnDestroy {
  subject$ = new Subject<void>();

  @Input() item: File;
  @Input() path = 'img';

  image$: Observable<ImageFileData>;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(
    private storage: FirebaseStorage,
    private firestore: FirestoreService<any>
  ) {}

  ngOnInit(): void {
    if (this.item) {
      this.image$ = resizeImage(this.item).pipe(
        tap(({ file }) => {
          const name = `${Date.now()}/${file.name}`;
          const path = `${this.path}/${name}`;
          const ref = this.storage.ref(path);
          this.task = this.storage.upload(path, file);
          this.percentage = this.task.percentageChanges();
          this.snapshot = this.task.snapshotChanges().pipe(
            finalize(async () => {
              const download = ref.getDownloadURL();
              this.downloadURL = await download.toPromise();
              this.firestore.add(path, { name });
            })
          );
        })
      );
    }
  }
  isActive(snapshot): boolean {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
