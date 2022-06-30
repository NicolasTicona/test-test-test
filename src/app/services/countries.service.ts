import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoCompleteItem } from '../shared/auto-complete/interfaces/auto-complete-item.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {}

  getCountries(): Observable<AutoCompleteItem[]> {
    return this.http.get('https://restcountries.com/v3.1/all?fields=name,cca2').pipe(
      map((countries: any) => {
        return countries.map(country => {
          return {
            label: country.name.common,
            value: country.cca2
          }
        });
      })
    )
  }
}
