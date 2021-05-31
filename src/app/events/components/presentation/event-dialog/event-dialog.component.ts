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
      id: undefined,
      semester_id: undefined,
      user_creator_id: undefined,
      name: [, Validators.required],
      date: [, Validators.required],
      participants: undefined,
      location: undefined,
      description: undefined,
      gallery: [],
    });

    if (this.data) {
      this.eventFormGroup.patchValue({
        ...this.data,
        date: moment(
          new Date(
            (this.data.date.seconds +
              this.data.date.nanoseconds * 10 ** -9) *
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
        date: moment(eventFormGroup.value.date).toDate(),
      });
    }
  }

  completed(gallery) {
    if (this.eventFormGroup.valid) {
      this.dialogRef.close({
        ...this.eventFormGroup.value,
        date: moment(this.eventFormGroup.value.date).toDate(),
        gallery
      });
    } 
  }
}
