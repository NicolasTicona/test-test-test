import { LocationForecast } from '../interfaces/location-forecast.interface';

export function formatForecast(obj: any): LocationForecast {
  const date = new Date(obj.dt * 1000);
  
  return {
    day: date,
    currentCondition: obj.weather[0].main,
    temperature: {
      min: obj.temp.min,
      max: obj.temp.max
    }
  }
}