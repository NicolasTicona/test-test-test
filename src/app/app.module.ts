import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ZipcodeSearchComponent } from './zipcode-search/zipcode-search.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SetImagePipe } from './pipes/set-image.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ZipcodeSearchComponent,
    WeatherCardComponent,
    WeatherForecastComponent,
    HomeComponent,
    SetImagePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
