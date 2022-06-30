import { WeatherInfo } from '../interfaces/weather-info.interface';

export function formatWeatherInfo(obj: any, zipcode: string, countryCode: string): WeatherInfo {
  return {
    name: obj?.name,
    currentCondition: obj?.weather[0].main,
    temperature: {
      temp: obj?.main.temp,
      tempMax: obj?.main.temp_max,
      tempMin: obj?.main.temp_min
    },
    zipcode,
    countryCode
  }
}