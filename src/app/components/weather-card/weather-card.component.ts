import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherInfo } from '../../interfaces/weather-info.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {

  @Input() location: WeatherInfo;
  @Output() remove = new EventEmitter<string>();

  onRemove(): void {
    this.remove.emit(this.location.zipcode);
  }
}
