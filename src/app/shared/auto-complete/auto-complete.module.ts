import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoCompleteComponent } from './auto-complete.component';
import { FunctionPipe } from '../pipes/function-pipe.pipe';
import { OverlayModule } from '@angular/cdk/overlay'
import { A11yModule } from '@angular/cdk/a11y'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    A11yModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AutoCompleteComponent, FunctionPipe],
  exports: [AutoCompleteComponent]
})
export class AutoCompleteModule {}