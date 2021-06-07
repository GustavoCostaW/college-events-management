import { CoursesService } from './../../core/courses.service';
import { Course } from './../../models/course.model';
import { EventsService } from './../../core/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent implements OnInit {
  public events$: Observable<Event[]> = of([]);
  public course$: Observable<Course> = of();
  public semester_year$: Observable<string>;

  constructor(
    private activatedRouter: ActivatedRoute,
    private eventsService: EventsService,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.semester_year$ = this.activatedRouter.queryParams.pipe(
      filter((params) => !!params.semester && !!params.course_id),
      map((params) => params.semester)
    );

    this.course$ = this.activatedRouter.queryParams.pipe(
      filter((params) => !!params.course_id),
      switchMap((params) => this.courseService.getCourse(params.course_id))
    );

    this.events$ = this.activatedRouter.queryParams.pipe(
      filter((params) => !!params.semester && !!params.course_id),
      switchMap((params) =>
        this.eventsService.getAllEventsBySemesterAndCourse(
          params.course_id,
          params.semester
        )
      )
    );
  }

  public print(
    gallery: string[],
    j: number,
    events: string[],
    i: number
  ): void {
    if (events.length - 1 === i && gallery.length - 1 === j) {
      setTimeout((_) => {
        window.print();
      }, 500);
    }
  }
}
