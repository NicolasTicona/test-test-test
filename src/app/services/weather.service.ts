import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherInfo } from '../interfaces/weather-info.interface';
import { StorageService } from './storage.service';
import { formatWeatherInfo } from '../utils/format-weather';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private locations: WeatherInfo[] = [];
  private locationsSubject$ = new BehaviorSubject<WeatherInfo[]>([]); 
  private readonly defaultUnit = 'imperial';

  locations$: Observable<WeatherInfo[]> = this.locationsSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.locations = this.storageService.getLocations();
    this.locationsSubject$.next(this.locations);  
  }

  addLocation(zipcode: string): Observable<WeatherInfo> {
    return this.getLocation(zipcode).pipe(
      tap(weather => {
        if(this.locationExists(weather.zipcode)) {
          return;
        }
        
        this.saveLocation(weather)
        this.locationsSubject$.next(this.locations);
      })  
    )
  }

  getLocationForecast(zipcode: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/forecast/daily`, {
      params: {
        zip: zipcode,
        units: this.defaultUnit,
        cnt: 5,
        appId: environment.API_KEY,
      }
    }).pipe(
      catchError(err => {
        this.showError(err?.error?.message);
        return EMPTY;
      })
    )
  }

  getLocation(zipcode: string): Observable<WeatherInfo | never> {
    return this.http.get(`${environment.API_URL}/weather`, {
      params: {
        zip: zipcode,
        units: this.defaultUnit,
        appId: environment.API_KEY,
      }
    }).pipe(
      map(res => formatWeatherInfo(res, zipcode)),
      catchError(err => {
        this.showError(err?.error?.message);
        return EMPTY;
      }),
    )
  }

  removeLocation(zipcode: string): void {
    this.storageService.removeItem(zipcode);
    this.locations = this.locations.filter(item => item.zipcode !== zipcode);
    this.locationsSubject$.next(this.locations);
  }

  private locationExists(zipcode: string): boolean {
    return !!this.storageService.getItem(zipcode);
  }

  private saveLocation(weather: WeatherInfo): void {
    this.storageService.setItem(weather);
    this.locations.unshift(weather);
  }

  private showError(message: string): void {
    alert(message ?? 'Something went wrong');
  }

}
