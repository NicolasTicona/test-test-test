import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ZipcodeSearchComponent } from './components/zipcode-search/zipcode-search.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SetImagePipe } from './pipes/set-image.pipe';
import { SaveButtonModule } from './shared/save-button/save-button.module';
import { AutoCompleteModule } from './shared/auto-complete/auto-complete.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SaveButtonModule,
    AutoCompleteModule
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
