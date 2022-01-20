import { Injectable } from '@angular/core';
import { WeatherInfo } from '../interfaces/weather-info.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(item: WeatherInfo): void {
    let locations = this.getLocations();

    locations.unshift(item);

    localStorage.setItem('locations', JSON.stringify(locations));
  }

  getItem(zipcode: string): WeatherInfo {
    const locations = this.getLocations();

    return locations.find(item => item.zipcode === zipcode);
  }

  getLocations(): WeatherInfo[] {
    return localStorage.getItem('locations') ? JSON.parse(localStorage.getItem('locations')) : [];
  }

  removeItem(zipcode: string): void {
    let locations = this.getLocations();

    locations = locations.filter(item => item.zipcode !== zipcode);

    localStorage.setItem('locations', JSON.stringify(locations));
  }
}
