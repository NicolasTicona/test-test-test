import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormControl, Validators } from '@angular/forms';
import { finalize, Subject } from 'rxjs';
import { ButtonConfig } from '../../shared/save-button/interfaces/button-config.interface'

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent {

  zipcode: FormControl;
  ZIP_LENGTH = 5;
  isLoading = false;

  saveButtonConfig: ButtonConfig = {
    default: {
      text: 'Add Location',
      bgColor: '#1976D2'
    },
    working: {
      text: 'Adding...',
      bgColor: '#7BA9D0'
    },
    done: {
      text: 'Done',
      imgUrl: 'assets/icons/checked.png',
      bgColor: '#198754'
    }
  };

  items = [
    {
      label: 'New York',
    },
    {
      label: 'London',
    },
    {
      label: 'Paris',
    }
  ]

  constructor(private weatherService: WeatherService) {
    this.zipcode = new FormControl(
      '',
      [Validators.required, Validators.minLength(this.ZIP_LENGTH), Validators.maxLength(this.ZIP_LENGTH)]
    );
  }

  onAddLocation(): void {
    if (this.zipcode.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.weatherService.addLocation(this.zipcode.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

}
