import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StorageService } from './services/storage.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  subscription: Subscription;
  isCallable = true;

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.weatherService.locations$.subscribe(locations => {
      if(locations.length > 0) {
        this.setAutoRefresh();
        this.isCallable = false;
      }else{
        this.isCallable = true;
        this.subscription?.unsubscribe();
      }
    })
  }

  setAutoRefresh(): void {
    if(!this.isCallable) {
      return;
    }

    this.subscription?.unsubscribe();
    this.subscription = interval(30000)
      .pipe(
        filter(() => this.storageService.getLocations().length > 0)
      )
      .subscribe(() => {
        this.weatherService.autoRefresh();
      })
  }

}
