import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_FORMATS } from '../app.date.format';

const reExport = [
  CommonModule,
  RouterModule,
  MaterialModule,
  FlexLayoutModule,
  ReactiveFormsModule,
];
const components = [LoadingComponent];

@NgModule({
  imports: reExport,
  exports: [...reExport, ...components],
  declarations: components,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class SharedModule {}
