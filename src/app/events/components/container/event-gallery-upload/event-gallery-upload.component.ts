import { UuidGeneratorService } from './../../../../utils/uuid-generator.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-gallery-upload',
  templateUrl: './event-gallery-upload.component.html',
  styleUrls: ['./event-gallery-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventGalleryUploadComponent implements OnInit {
  folderName: string;
  files: File[] = [];

  ngOnInit(): void {
    this.generateEventsGalleryFolder();
  }
  private generateEventsGalleryFolder(): void {
    this.folderName = UuidGeneratorService.createUUID();
  }
  onFileChange(files: FileList): void {
    for (let x = 0; x < files.length; x++) {
      if (files.item(x)) {
        this.files.push(files.item(x));
      }
    }
  }
}
