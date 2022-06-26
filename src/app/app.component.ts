import { Component, OnInit } from '@angular/core';
import { defer, fromEvent, interval, takeUntil, takeWhile } from 'rxjs';
import { StorageService } from './services/storage.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // this.setAutoRefresh();
  }

  setAutoRefresh(): void {
    interval(30000)
      .pipe(
        takeWhile(() => this.storageService.getLocations().length > 0)
      )
      .subscribe(() => {
        this.weatherService.autoRefresh();
      })
  }

}
