import { Injectable } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../models/events.model';
import { FirestoreService, FirestoreQuery, firebaseMessages as error } from '../shared/firebase';

@Injectable({
  providedIn: 'root'
})
export class CollegeEventsService {

  constructor(private firestore: FirestoreService<Event>) { }

  findEventsByCourse(courseId: string): Observable<Event[]> {

    const query = new FirestoreQuery();
    query.orderBy = ['eventDate', 'desc'];
    const path = ['courses', courseId, 'events'];

    const coll = this.firestore.query(path, query);
    return coll.valueChanges({ idField: 'id' });
  }

  deleteEvent(courseId: string, eventId: string): Promise<void> {
    const path = ['courses', courseId, 'events', eventId];
    return this.firestore.doc(path).delete();
  }

  updateEvent({ courseId, id, ...event }: Event): Observable<boolean> {
    return new Observable(subscriber => {

      const path = ['courses', courseId, 'events', id];
      const doc = this.firestore.doc(path);

      doc.update({ courseId, id, ...event })
        .then(() => subscriber.next(true))
        .catch(({ code }) => subscriber.error(error[code]));
    });
  }

  insertEvent({ courseId, ...event }: Event): Observable<DocumentReference> {
    return new Observable(subscriber => {

      const path = ['courses', courseId, 'events'];

      this.firestore.add(path, { courseId, ...event })
        .then((ref) => subscriber.next(ref))
        .catch(err => subscriber.error(err));
    });
  }
}
