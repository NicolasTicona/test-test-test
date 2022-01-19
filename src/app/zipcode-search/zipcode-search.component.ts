import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormControl, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-zipcode-search',
  templateUrl: './zipcode-search.component.html',
  styleUrls: ['./zipcode-search.component.css']
})
export class ZipcodeSearchComponent implements OnInit {

  zipcode: FormControl;
  unsubscribe$ = new Subject<boolean>();
  ZIP_LENGTH = 5;
  isLoading = false;

  constructor(private weatherService: WeatherService) {
    this.zipcode = new FormControl(
      null,
      [Validators.required, Validators.minLength(this.ZIP_LENGTH), Validators.maxLength(this.ZIP_LENGTH)]
    );
  }

  ngOnInit(): void {
  }

  onAddLocation() {
    if (this.zipcode.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.weatherService.addLocation(this.zipcode.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  ngDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
