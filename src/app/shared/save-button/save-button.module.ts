import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SaveButtonComponent } from './save-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SaveButtonComponent,
  ],
  exports: [SaveButtonComponent],
})
export class SaveButtonModule { }