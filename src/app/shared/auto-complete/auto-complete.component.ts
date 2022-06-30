import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { filter, map, mapTo, shareReplay } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y'
import { AutoCompleteItem } from './interfaces/auto-complete-item.interface';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit{
  isOpen$: Observable<boolean>;
  filterSubject = new BehaviorSubject<string>('');
  items$: Observable<AutoCompleteItem[]>;
  closeOverlay$ = new Subject<boolean>();

  inputText = '';
  selectedItem: AutoCompleteItem | null;

  @ViewChild('originOverlay', {read: ElementRef, static: true})
  input: ElementRef;
  
  @Input() items: AutoCompleteItem[];
  @Output() selected = new EventEmitter<string | null>();

  constructor(
    private focusMonitor: FocusMonitor,
  ) {
    this.getItems();
  }

  ngOnInit(): void {
    const isPanelVisible$ = this.focusMonitor.monitor(this.input).pipe(
      filter(focused => !!focused),
      mapTo(true)
    )

    this.isOpen$ = merge(this.closeOverlay$, isPanelVisible$).pipe(
      shareReplay(1)
    )
  }

  
  getItems(): void {
    this.items$ = this.filterSubject.asObservable().pipe(
      map(search => {
        if(!search) return this.items;

        return this.items.filter(
          item => this.matches(item.label, search)
        );
      })
    );
  }

  onFilter(event): void {
    this.selectedItem = null;
    this.filterSubject.next(event.target.value);
  }

  onSelect(item: AutoCompleteItem): void {
    this.input.nativeElement.value = item.label;
    this.filterSubject.next(item.label);
    this.selectedItem = item;
    this.hide();
  }

  overlayOutsideClick(event: MouseEvent): void {
    if(this.input.nativeElement !== event.target) {
      this.hide();
    }
  }

  hide(): void {
    this.selected.emit(this.selectedItem?.value);
    this.closeOverlay$.next(false);
  }

  identify(index: number, item: AutoCompleteItem): string | undefined {
    return item.value;
  }

  convertStringToArray(value: string): Array<string> {
    return Array.from(value);
  }

  matches(filter: string, str: string): boolean {
    return filter?.toLowerCase().includes(str?.toLowerCase());
  }
}