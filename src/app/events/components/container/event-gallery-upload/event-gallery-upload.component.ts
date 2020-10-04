import { GalleryService } from './../../../../core/gallery.service';
import { UuidGeneratorService } from './../../../../utils/uuid-generator.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { forkJoin } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-event-gallery-upload',
  templateUrl: './event-gallery-upload.component.html',
  styleUrls: ['./event-gallery-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventGalleryUploadComponent implements OnInit {
  @Output() completed$ = new EventEmitter();
  @Output() inProgress$ = new EventEmitter();
  public filesData = [];
  private folderName: string;

  constructor(
    private storage: AngularFireStorage,
    private galleryService: GalleryService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.generateEventsGalleryFolder();
  }

  private generateEventsGalleryFolder() {
    this.folderName = UuidGeneratorService.createUUID();
  }

  uploadImage(event) {
    const files = event.target.files;

    // const file = event.target.files[0];
    //

    // task.percentageChanges().subscribe((q) => {
    //   console.log(q);
    // });
    // task.snapshotChanges().subscribe(() => {
    //   ref.getDownloadURL().subscribe((q) => {
    //     console.log(q);
    //   });
    // });

    let uploadFilesObs$ = [];

    for (let i = 0; i < files.length; i++) {
      const fileFormat = files[i].name.slice(-4);
      const fileName = `${UuidGeneratorService.createUUID()}${new Date().getTime()}${fileFormat}`;
      const filePath = `${GalleryService.images_folder}/${this.folderName}/${fileName}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, files[i]);
      const uploadPercentage$ = task.percentageChanges();
      const finalImageURL$ = ref.getDownloadURL();
      // .pipe(
      //   map((url) => this.galleryService.getUpdatedName(fileFormat, url))
      // );

      uploadFilesObs$ = [
        ...uploadFilesObs$,
        uploadPercentage$.pipe(
          filter((p) => p === 100),
          switchMap(() => finalImageURL$),
          map((url) => this.galleryService.getUpdatedName(fileFormat, url))
        ),
      ];

      // this.filesData = [
      //   ...this.filesData,
      //   {
      //     uploadPercentage$,
      //     finalImageURL$,
      //   },
      // ];
    }

    forkJoin(uploadFilesObs$).subscribe((files) => {
      console.log(files);
      this.filesData = files;

      this.cdRef.markForCheck();
    });
  }
}
