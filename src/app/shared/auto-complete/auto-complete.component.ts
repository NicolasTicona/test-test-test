import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, debounce, merge, Observable, Subject } from 'rxjs';
import { filter, map, mapTo, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y'
import { CdkConnectedOverlay, Overlay, OverlayOutsideClickDispatcher, OverlayRef } from '@angular/cdk/overlay';

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
  isOpen$: Observable<boolean>;
  filterSubject = new BehaviorSubject<string>('');
  items$: Observable<AutoCompleteItem[]>;
  closeOverlay$ = new Subject<boolean>();

  inputText = '';

  @ViewChild('originOverlay', {read: ElementRef, static: true})
  input: ElementRef;
  
  @Input() items: AutoCompleteItem[];
  @Output() selected = new EventEmitter<AutoCompleteItem>();

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

  overlayOutsideClick(event: MouseEvent){
    console.log(event);

    if(this.input.nativeElement !== event.target) {
      this.hide();
    }
  }

  hide() {
    this.closeOverlay$.next(false);
  }

  getItems() {
    this.items$ = this.filterSubject.asObservable().pipe(
      map(search => {
        if(!search) return this.items;

        return this.items.filter(
          item => item.label.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }

  identify(index: number, item: AutoCompleteItem) {
    return item.value;
  }

  onFilter(event) {
    this.filterSubject.next(event.target.value);
  }

  onSelect(item: AutoCompleteItem) {
    this.input.nativeElement.value = item.label;
    this.filterSubject.next(item.label);
    this.selected.emit(item);
    this.hide();
  }

  convertStringToArray(value: string) {
    return Array.from(value);
  }

  matches(filter: string, letter: string) {
    return filter?.toLowerCase().includes(letter?.toLowerCase());
  }
}