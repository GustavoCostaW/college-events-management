import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.eventFormGroup = this.fb.group({
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
        date: this.data.date.toDate(),
        gallery: this.data.gallery ? this.data.gallery : []
      });
    }
  }
  
  public exclude(eventFormGroup: FormGroup): void {
    this.dialogRef.close({
      mode: EventDialogComponentMode.DELETE,
      ...eventFormGroup.value,
    });
  }

  public onSubmit(eventFormGroup: FormGroup): void {
    if (eventFormGroup.valid) {
      this.dialogRef.close({
        ...eventFormGroup.value,
        date: eventFormGroup.value.date,
      });
    }
  }

  public galleryUpdated(gallery: string[]): void {
    this.eventFormGroup.patchValue({gallery});
  }
}
