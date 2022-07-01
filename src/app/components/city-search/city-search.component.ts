import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CountriesService } from '../../services/countries.service';
import { FormControl, Validators } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { ButtonConfig } from '../../shared/save-button/interfaces/button-config.interface'
import { AutoCompleteItem } from '../../shared/auto-complete/interfaces/auto-complete-item.interface'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent {

  zipcode: FormControl;
  ZIP_LENGTH = 5;
  isLoading = false;
  countryCode: string;
  items$: Observable<AutoCompleteItem[]>;

  constructor(private countriesService: CountriesService, private weatherService: WeatherService) {
    this.setZipcodeControl();
    this.getCountries();
  }

  getCountries(): void {
    this.items$ = this.countriesService.getCountries()
  }

  setZipcodeControl(): void {
    this.zipcode = new FormControl(
      '',
      [Validators.required]
    );
  }

  onAddLocation(): void {
    if (this.zipcode.invalid || this.isLoading || !this.countryCode) {
      return;
    }

    this.isLoading = true;

    this.weatherService.addLocation(this.zipcode.value, this.countryCode)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

}
