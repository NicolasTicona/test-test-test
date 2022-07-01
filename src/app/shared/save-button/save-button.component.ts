import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonState } from './interfaces/button-config.interface'

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styles: [
    `
      button {
        outline: none;
        border: none;
        padding: none;
      }
    `
  ]
})
export class SaveButtonComponent implements OnChanges {
  state: ButtonState = 'default';
  loadingStateSubject$ = new Subject<void>();

  @Input() isLoading = false;
  @Output() clicked = new EventEmitter<void>();
 

  ngOnInit(): void {
    this.loadingStateSubject$.subscribe(() => {
      this.setWorkingState();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.isLoading?.currentValue) {
      this.loadingStateSubject$.next();
    }
  }

  setWorkingState(): void {
    this.state = 'working';
    setTimeout(() => {
      if(this.isLoading) {
        this.setWorkingState();
        return;
      }

      this.setDoneState();
    }, 500);
  }

  setDoneState(): void {
    this.state = 'done';

    setTimeout(() => {
      this.state  = 'default';
    }, 500)
  }
  
  onClick(): void {
    if(this.state !== 'default') {
      return;
    }

    this.clicked.emit();
  }
}