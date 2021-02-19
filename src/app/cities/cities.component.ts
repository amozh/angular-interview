import { Component, OnInit } from '@angular/core';
import { ICityForecast } from '../data.service';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  allCityForecasts: ICityForecast[] = [];

  constructor(private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.forecastService.getAllCityForecasts().subscribe(data => {
      this.allCityForecasts = data;
    });
  }

  printableCities(): string {
    if (this.allCityForecasts.length) {
      return JSON.stringify(this.allCityForecasts, null, 2);
    }
    return '';
  }

}
