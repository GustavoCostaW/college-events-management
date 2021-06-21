import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Course } from './../models/course.model';
import { from } from 'rxjs';

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
        map((course) => {{}
          return {
            id,
            ...course,
          };
        })
      );
  }

  public getCourses(): Observable<Course[]> {
    return this.afs
      .collection<Course>(
        'courses',
        (ref) => ref.orderBy('name', 'desc')
      )
      .valueChanges({
        idField: 'id',
      })
      .pipe(take(1));
  }

  public insertCourse(
    course: Course,
  ): Observable<any> {
    return from(
      this.afs.collection<Course>('courses').add({
        ...course,
      })
    );
  }
}
