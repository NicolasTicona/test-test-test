import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, EMPTY, forkJoin, map, Observable, of, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherInfo } from '../interfaces/weather-info.interface';
import { StorageService } from './storage.service';
import { formatWeatherInfo } from '../utils/format-weather';
import { showError } from '../utils/error-alert'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private locations: WeatherInfo[] = [];
  private locationsSubject$ = new BehaviorSubject<WeatherInfo[]>([]); 
  private readonly defaultUnit = 'imperial';
  
  stopRefresh$ = new Subject();
  locations$: Observable<WeatherInfo[]> = this.locationsSubject$.asObservable();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.locations = this.storageService.getLocations();
    this.locationsSubject$.next(this.locations);  
  }

  autoRefresh(): void {
    const cities = this.locations.map(item => {
      return {
        zipcode: item.zipcode,
        countryCode: item.countryCode,
      }
    });

    const requests = cities.map(city => this.getLocation(city.zipcode, city.countryCode));

    forkJoin(requests).pipe(
    ).subscribe((locations) => {
      this.storageService.removeLocations();
      this.locations = locations;
      this.storageService.setItems(locations);
      this.locationsSubject$.next(this.locations);
    })
  }

  addLocation(zipcode: string, countryCode: string): Observable<WeatherInfo> {
    if(this.locationExists(zipcode)) {
      return EMPTY;
    }

    return this.getLocation(zipcode, countryCode).pipe(
      tap(weather => {
        this.saveLocation(weather)
        this.locationsSubject$.next(this.locations);
      })  
    )
  }

  getLocationForecast(zipcode: string): Observable<any> {
    const countryCode = this.storageService.getItem(zipcode)?.countryCode;

    return this.http.get(`${environment.API_URL}/forecast/daily`, {
      params: {
        zip: `${zipcode}${countryCode ? `,${countryCode}` : 'US'}`,
        units: this.defaultUnit,
        cnt: 5,
        appId: environment.API_KEY,
      }
    }).pipe(
      catchError(err => {
        showError(err?.error?.message);
        return EMPTY;
      })
    )
  }

  getLocation(zipcode: string, countryCode: string): Observable<WeatherInfo | never> {
    return this.http.get(`${environment.API_URL}/weather`, {
      params: {
        zip: `${zipcode}${countryCode ? `,${countryCode}` : 'US'}`,
        units: this.defaultUnit,
        appId: environment.API_KEY,
      }
    }).pipe(
      map(res => formatWeatherInfo(res, zipcode, countryCode)),
      catchError(err => {
        showError(err?.error?.message);
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

}
