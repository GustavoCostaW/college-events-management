import { Event } from './../models/events.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  constructor() {}

  public returnSemesterId(event: Event): string {
    const month = event.date.getMonth() + 1;
    const year = event.date.getFullYear();
    const semester = month <= 6 ? 1 : 2;

    return `${semester}${year}`;
  }
}
