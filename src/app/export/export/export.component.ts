import { EventsService } from './../../core/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {

  public events$: Observable<Event[]>;

  constructor(
    private activatedRouter: ActivatedRoute,
    private eventsService: EventsService
  ) {}
  

  ngOnInit(): void {
    this.events$ = this.activatedRouter.queryParams
    .pipe(
      filter((params) => !!params.semester),
      switchMap((params) =>
        this.eventsService.getAllEventsBySemesterAndCourse(
          'bC7Lt9A2l6jlvslB2Enq',
          params.semester
        )
      )
    );
  }

  print(gallery, j, events, i){
    if (events.length-1 === i && gallery.length-1 === j) {
      setTimeout(_ => {
        window.print();
      }, 500);
    }
  }
}
