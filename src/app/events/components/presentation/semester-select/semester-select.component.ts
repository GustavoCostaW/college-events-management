import { ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-semester-select',
  templateUrl: './semester-select.component.html',
  styleUrls: ['./semester-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SemesterSelectComponent {
  @ViewChild('picker') datePicker: MatDatepicker<Date>;
  public semesterFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SemesterSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.semesterFormGroup = this.fb.group({
      semester: undefined,
      date: undefined,
    });

    if (this.data?.semester && this.data?.year) {
      this.semesterFormGroup.setValue({
        semester: this.data.semester,
        date: this.data.year,
      });
    } else {
      // fix change detection issues
      setTimeout(() => {
        this.datePicker.open();
      });
    }
  }

  public yearSelected(date: Date, picker: MatDatepicker<Date>): void {
    picker.close();

    this.semesterFormGroup.get('date').patchValue(date.getFullYear());
  }

  public filter(semester: string, year: string): void {
    this.dialogRef.close({
      semester,
      year,
    });
  }
}
