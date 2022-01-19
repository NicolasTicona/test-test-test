import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  weatherInfo$: Observable<any>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherInfo$ = this.weatherService.weatherInfo$;
  }

}
