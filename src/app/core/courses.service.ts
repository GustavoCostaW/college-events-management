import { Course } from './../models/course.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courseId = 'wcVdWWl0usv20Jx4ZfCW';

  constructor(private afs: AngularFirestore) {}

  getCourse(): Observable<Course> {
    return this.afs
      .doc<any>(`courses/${this.courseId}`)
      .valueChanges()
      .pipe(
        take(1),
        map((course) => {
          return {
            id: this.courseId,
            ...course,
          };
        })
      );
  }
}
