import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../../../../models/events.model';
import * as _moment from 'moment';

const moment = _moment;

export enum EventDialogComponentMode {
  DELETE = 'delete',
  EDIT = 'edit',
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDialogComponent {
  public eventFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    private formGroup: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) {}

  ngOnInit(): void {
    this.eventFormGroup = this.formGroup.group({
      id: [],
      semesterId: [],
      userCreatorId: [],
      eventName: [, Validators.required],
      eventDate: [, Validators.required],
      eventParticipants: [],
      eventLocation: [],
      eventDescription: [],
      eventGallery: [
        {
          id: 1,
          photos: [1, 2, 3],
        },
      ],
    });

    if (this.data) {
      this.eventFormGroup.patchValue({
        ...this.data,
        eventDate: moment(
          new Date(
            (this.data.eventDate.seconds +
              this.data.eventDate.nanoseconds * 10 ** -9) *
              1000
          )
        ),
      });
    }
  }
  exclude(eventFormGroup: FormGroup): void {
    this.dialogRef.close({
      mode: EventDialogComponentMode.DELETE,
      ...eventFormGroup.value,
    });
  }

  onSubmit(eventFormGroup: FormGroup): void {
    if (eventFormGroup.valid) {
      this.dialogRef.close({
        ...eventFormGroup.value,
        eventDate: moment(eventFormGroup.value.eventDate).toDate(),
      });
    }
  }
}
