import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherInfo } from '../interfaces/weather-info.interface';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private locations: WeatherInfo[] = [];
  private locationsSubject$ = new BehaviorSubject<WeatherInfo[]>([]); 
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
