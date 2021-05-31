import { Semester } from './../models/semester.model';
import { Event } from './../models/events.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CoursesService } from './courses.service';
import { from, Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  constructor(private afs: AngularFirestore) {}

  returnSemesterId(event: Event): string {
    const month = event.date.getMonth() + 1;
    const year = event.date.getFullYear();
    const semester = month <= 6 ? 1 : 2;

    return `${semester}${year}`;
  }

  // returnSemesterId(event: Event): Observable<string> {
  //   const month = event.eventDate.getMonth() + 1;
  //   const year = event.eventDate.getFullYear();
  //   const semester = month <= 6 ? 1 : 2;

  //   return this.findSemester(semester, year).pipe(
  //     switchMap((result: Semester[]) => {
  //       if (result.length) {
  //         return of(result[0].id);
  //       } else {
  //         return this.createSemester({
  //           year,
  //           semester,
  //         });
  //       }
  //     })
  //   );
  // }

  findSemester(semester: number, year: number): Observable<Semester[]> {
    return this.afs
      .collection<Semester>(`semesters`, (ref) =>
        ref.where('year', '==', year).where('semester', '==', semester)
      )
      .valueChanges({
        idField: 'id',
      })
      .pipe(take(1));
  }

  createSemester(semester: Semester): Observable<string> {
    return from(this.afs.collection<Semester>(`semesters`).add(semester)).pipe(
      map((semester) => semester.id)
    );
  }
}
