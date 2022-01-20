import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherInfo } from '../interfaces/weather-info.interface';
import { StorageService } from '../services/storage.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  locations$: Observable<WeatherInfo[]>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.locations$ = this.weatherService.locations$;
  }

  onRemoveLocation(zipcode: string){
    this.weatherService.removeLocation(zipcode);
  }

}
