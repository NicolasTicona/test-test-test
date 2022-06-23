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

  setItems(items: WeatherInfo[]): void {
    localStorage.setItem('locations', JSON.stringify(items));
  }

  getItem(zipcode: string): WeatherInfo | null{
    const locations = this.getLocations();

    return locations.find(item => item.zipcode === zipcode) ?? null;
  }

  getLocations(): WeatherInfo[] {
    return localStorage.getItem('locations') ? JSON.parse(localStorage.getItem('locations') ?? '') : [];
  }

  removeItem(zipcode: string): void {
    let locations = this.getLocations();

    locations = locations.filter(item => item.zipcode !== zipcode);

    localStorage.setItem('locations', JSON.stringify(locations));
  }

  removeLocations(): void {
    localStorage.removeItem('locations');
  }
}
