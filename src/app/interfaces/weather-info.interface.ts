export interface WeatherTemperature {
  temp: number;
  tempMax: number;
  tempMin: number;
}

export interface WeatherInfo {
  name: string;
  currentCondition: string;
  temperature: WeatherTemperature,
  zipcode: string;
}