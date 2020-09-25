import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const reExport = [CommonModule, RouterModule];

@NgModule({
  imports: reExport,
  exports: reExport,
})
export class SharedModule {}
