import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonConfig, ButtonState } from './interfaces/button-config.interface'

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styles: [`
    img {
      width: 15px
    }
  `]
})
export class SaveButtonComponent implements OnChanges {
  state: ButtonState = 'default';
  backgroundColor: string;
  loadingStateSubject$ = new Subject<void>();

  @Input() isLoading = false;
  @Input() config: ButtonConfig = {
    default: {
      text: 'Save',
      bgColor: '#1976D2'
    },
    working: {
      text: '',
      imgUrl: 'assets/images/spinner.gif',
      bgColor: '#FFD700'
    },
    done: {
      text: 'Saved!',
      bgColor: '#198754'
    }
  };

  @Output() clicked = new EventEmitter();

  ngOnInit(): void {
    this.backgroundColor = this.config.default.bgColor ?? '';

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
    this.backgroundColor = this.config.working.bgColor ?? '';
    setTimeout(() => {
      if(this.isLoading) {
        this.setDoneState();
        return;
      }

      this.setDoneState();
    }, 500);
  }

  setDoneState(): void {
    this.state = 'done';
    this.backgroundColor = this.config.done.bgColor ?? '';;

    setTimeout(() => {
      this.state  = 'default';
      this.backgroundColor = this.config.default.bgColor ?? '';;
    }, 500)
  }

  onClick(): void {
    if(this.state !== 'default') {
      return;
    }

    this.clicked.emit();
  }
}