import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherInfo } from '../interfaces/weather-info.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherInfo$ = new BehaviorSubject<WeatherInfo[]>([]); 
  weatherCollection: WeatherInfo[] = [];

  constructor(private http: HttpClient) { }

  addLocation(zipcode: string): Observable<WeatherInfo> {
    return this.getLocation(zipcode).pipe(
      tap(weather => {
        console.log(weather);
        this.weatherCollection.push(weather);
        this.weatherInfo$.next(this.weatherCollection);
      })  
    )
  }

  private getLocation(zipcode: string): Observable<WeatherInfo | never> {
    return this.http.get(`${environment.API_URL}`, {
      params: {
        zip: zipcode,
        appId: environment.API_KEY
      }
    }).pipe(
      map(res => this.formatWeatherInfo(res, zipcode)),
      catchError(err => {
        this.showError(err?.error?.message);
        return EMPTY;
      }),
    )
  }

  private formatWeatherInfo(obj: any, zipcode: string): WeatherInfo {
    console.log(obj);
    return {
      name: obj?.name,
      currentCondition: obj?.weather[0].main,
      temperature: {
        temp: obj?.main.temp,
        tempMax: obj?.main.temp_max,
        tempMin: obj?.main.temp_min
      },
      zipcode
    }
  }

  private showError(message: string): void {
    alert(message ?? 'Something went wrong');
  }

}
