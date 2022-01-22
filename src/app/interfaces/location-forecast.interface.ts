export interface LocationForecast {
  day: Date;
  currentCondition: string;
  temperature: {
    min: number;
    max: number;
  }
}