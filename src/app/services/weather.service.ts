import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_KEY = '5a4b2d457ecbef9eb2a71e480b947604';
  API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  addLocation(zipcode: string) {
    return this.getLocation(zipcode);
  }

  private getLocation(zipcode: string): Observable<any> {
    return this.http.get(`${this.API_URL}`, {
      params: {
        zip: zipcode,
        appId: this.API_KEY
      }
    }).pipe(
      catchError(err => {
        alert(err.error.message ?? 'Something went wrong.');
        return EMPTY;
      }),
    )
  }

}
