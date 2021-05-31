import { Course } from './../models/course.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  constructor(private afs: AngularFirestore) {}

  public getCourse(id: string): Observable<Course> {
    return this.afs
      .doc<any>(`courses/${id}`)
      .valueChanges()
      .pipe(
        take(1),
        map((course) => {
          return {
            id,
            ...course,
          };
        })
      );
  }
}
