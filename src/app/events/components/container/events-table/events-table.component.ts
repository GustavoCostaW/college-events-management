import { selectFeature } from './../../../store/selectors/events.selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addEventAction } from 'src/app/events/store/actions/events.actions';
import { Observable } from 'rxjs';
import { EventsState } from 'src/app/events/store/reducers/events.reducer';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsTableComponent implements OnInit {
  public events$: Observable<EventsState>;
  public courses$;

  constructor(private store: Store, private afs: AngularFirestore) {
    this.events$ = this.store.select(selectFeature);
    this.courses$ = afs
      .collection('courses')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );

    this.courses$.subscribe((q) => {
      console.log(q);
    });
  }

  ngOnInit() {}

  add(name) {
    this.store.dispatch(
      addEventAction({ name: new Date().getSeconds().toString() })
    );
  }
}
