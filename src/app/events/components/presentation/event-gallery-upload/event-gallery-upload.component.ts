import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
// rxjs
import { of, Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

// image compressor
import Compressor from 'compressorjs';

// services
import { UuidGeneratorService } from '../../../../utils/uuid-generator.service';
import { GalleryService } from '../../../../core/gallery.service';

@Component({
  selector: 'app-event-gallery-upload',
  templateUrl: './event-gallery-upload.component.html',
  styleUrls: ['./event-gallery-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventGalleryUploadComponent implements OnInit {
  @Output() updated$ = new EventEmitter();
  @Input() images: string[];

  public filesData = [];
  private folderName: string;
  public uploads$: Observable<string[]>;
  public loading = false;

  constructor(
    private storage: AngularFireStorage,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.uploads$ = of(this.images ? this.images : []);
    this.generateEventsGalleryFolder();
  }

  private generateEventsGalleryFolder(): void {
    this.folderName = UuidGeneratorService.createUUID();
  }

  public uploadImage(event): void {
    const files = event.target.files;

    let uploadFiles: string[] = [];
    this.loading = true;

    for (let i = 0; i < files.length; i++) {
      new Compressor(files[i], {
        quality: 0.8,
        success: (result) => {
          const fileFormat = files[i].name.slice(-4);
          const fileName = `${UuidGeneratorService.createUUID()}${new Date().getTime()}${fileFormat}`;
          const filePath = `${GalleryService.images_folder}/${this.folderName}/${fileName}`;
          const ref = this.storage.ref(filePath);
          const task = ref.put(
            new File([result], '', {
              lastModified: new Date().getTime(),
              type: result.type,
            })
          );

          const sub = task
            .snapshotChanges()
            .pipe(
              finalize(async () => {
                try {
                  const photoURL = await ref.getDownloadURL().toPromise();

                  uploadFiles.push(photoURL);

                  if (uploadFiles.length === files.length) {
                    this.finishedCompression(uploadFiles);
                  }
                  // sub.unsubscribe();
                } catch (error) {
                  console.log(error);
                }
              })
            )
            .subscribe();
        },
      });
    }
  }

  private finishedCompression(uploadFiles: string[]): void {
    this.uploads$ = this.uploads$.pipe(
      map((uploadedImages) => [...uploadedImages, ...uploadFiles]),
      take(1)
    );

    this.uploads$.subscribe((files) => {
      this.loading = false;
      this.updated$.next(files);
    });

    this.cdRef.markForCheck();
  }

  public remove(url: string): void {
    this.uploads$ = this.uploads$.pipe(
      map((images) => images.filter((image) => image !== url))
    );

    this.uploads$.pipe(take(1)).subscribe((files) => this.updated$.next(files));
    this.cdRef.markForCheck();
  }
}
