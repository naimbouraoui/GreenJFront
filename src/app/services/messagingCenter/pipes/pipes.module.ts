import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from './date.pipe';

@NgModule({
  declarations: [DateFormatPipe],
  imports: [CommonModule],
  exports: [DateFormatPipe],
})
export class PipesModule {}
