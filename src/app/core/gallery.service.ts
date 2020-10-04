import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor() {}

  static dimensions = '_600x400';
  static images_folder = 'events_images';

  getUpdatedName(format, file): string {
    return file.replace(format, GalleryService.dimensions + format);
  }
}
