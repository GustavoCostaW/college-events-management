import { SemesterService } from './semester.service';
import { Event } from './../models/events.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private path = (course_id, event_id = undefined) =>
    `courses/${course_id}/events/${event_id ? event_id : ''}`;

  constructor(
    private afs: AngularFirestore,
    private semesterService: SemesterService
  ) {}

  public getAllEventsByCourse(course_id: string): Observable<any> {
    console.log('hello!', this.path(course_id));
    return this.afs
      .collection<Event>(
        this.path(course_id),
        (ref) => ref.orderBy('date', 'desc')
        // .limit(100).startAfter({})
      )
      .valueChanges({
        idField: 'id',
      })
      .pipe(take(1));
  }

  public getAllEventsBySemesterAndCourse(
    course_id: string,
    semester_id: string
  ): Observable<any> {
    console.log('hello!', this.path(course_id));
    return this.afs
      .collection<Event>(
        this.path(course_id),
        (ref) =>
          ref.orderBy('date', 'desc').where('semester_id', '==', semester_id)
      )
      .valueChanges({
        idField: 'id',
      })
      .pipe(take(1));
  }

  public deleteEvent(event_id: string, course_id: string): Observable<boolean> {
    return from(
      this.afs.doc<Event>(this.path(course_id, event_id)).delete()
    ).pipe(map(() => true));
  }

  public updateEvent(event: Event, course_id: string): Observable<boolean> {
    return from(
      this.afs
        .doc<Event>(`courses/${course_id}/events/${event.id}`)
        .update({
          ...event,
          semester_id: this.semesterService.returnSemesterId(event)
        })
    ).pipe(map(() => true));
  }

  public insertEvent(
    event: Event,
    course_id: string,
    user_creator_id: string
  ): Observable<any> {
    return from(
      this.afs.collection<Event>(this.path(course_id)).add({
        ...event,
        semester_id: this.semesterService.returnSemesterId(event),
        user_creator_id,
      })
    );
  }
}
