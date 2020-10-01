import { SemesterService } from './semester.service';
import { Event } from './../models/events.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private afs: AngularFirestore,
    private courseService: CoursesService,
    private semesterService: SemesterService
  ) {}

  getEventsByCourse(): Observable<Event[]> {
    return this.afs
      .collection<Event>(
        `courses/${this.courseService.courseId}/events/`,
        (ref) => ref.orderBy('eventDate', 'desc')
        // .limit(100).startAfter({})
      )
      .valueChanges({
        idField: 'id',
      })
      .pipe(take(1));
  }

  deleteEvent(id: string): Observable<boolean> {
    return from(
      this.afs
        .doc<Event>(`courses/${this.courseService.courseId}/events/${id}`)
        .delete()
    ).pipe(map(() => true));
  }

  updateEvent(event: Event): Observable<boolean> {
    return this.semesterService.returnSemesterId(event).pipe(
      switchMap((semesterId) => {
        const updatedEvent: Event = {
          ...event,
          semesterId,
        };
        return from(
          this.afs
            .doc<Event>(
              `courses/${this.courseService.courseId}/events/${event.id}`
            )
            .update(updatedEvent)
        ).pipe(map(() => true));
      })
    );
  }

  insertEvent(event: Event): Observable<DocumentReference> {
    return this.semesterService.returnSemesterId(event).pipe(
      switchMap((semesterId) => {
        const updatedEvent: Event = {
          ...event,
          semesterId,
        };
        return this.afs
          .collection<Event>(`courses/${this.courseService.courseId}/events`)
          .add(updatedEvent);
      })
    );
  }
}
