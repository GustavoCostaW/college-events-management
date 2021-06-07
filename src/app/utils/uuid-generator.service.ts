import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UuidGeneratorService {
  constructor() {}

  static createUUID(): string {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
