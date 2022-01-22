import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { LocationForecast } from '../interfaces/location-forecast.interface';
import { formatForecast } from '../utils/format-forecast';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  forecast: LocationForecast[] = [];
  zipcode: string;
  cityName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService
  ) {}
  
  ngOnInit(): void {
    this.zipcode = this.activatedRoute.snapshot.paramMap.get('zipcode');
    this.getForecast(this.zipcode);
  }

  getForecast(zipcode: string): void {
    this.weatherService.getLocationForecast(zipcode).subscribe(res => {
      this.cityName = res.city.name;
      this.forecast = res.list.map(item => formatForecast(item));
    })
  }

}
