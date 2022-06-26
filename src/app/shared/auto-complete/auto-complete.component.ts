import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, debounce, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

interface AutoCompleteItem {
  label: string;
  value?: string;
}

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit{
  showOptions = false;
  @Input() items: AutoCompleteItem[];
  @Output() selected = new EventEmitter<AutoCompleteItem>();

  filterSubject = new BehaviorSubject<string>('');
  items$: Observable<AutoCompleteItem[]>;

  constructor() {
    this.items$ = this.filterSubject.asObservable().pipe(
      map(search => {
        if(!search) return this.items;

        return this.items.filter(
          item => item.label.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }

  ngOnInit(): void {
  }

  identify(index: number, item: AutoCompleteItem) {
    return item.value;
  }

  onFilter(event) {
    this.filterSubject.next(event.target.value);
  }

  log() {
    console.log('hola')
  }

  onSelect(item: AutoCompleteItem) {
    this.selected.emit(item);
  }
}