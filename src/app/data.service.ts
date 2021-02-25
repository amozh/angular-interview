import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { RequestInfo } from 'angular-in-memory-web-api/interfaces';

export interface IForecast {
  tempCelsius: number;
  humidityPercent: number;
  windSpeed: number;
  weather: 'sunny' | 'cloudy' | 'raining';
}

export interface ICityForecast {
  id: number;
  cityName: string;
  date: Date;
  forecastsByHour: {[key: number]: IForecast};
}

@Injectable({
  providedIn: 'root'
})
export class DataService  implements InMemoryDbService {
  constructor() { }

  createDb(reqInfo?: RequestInfo): { forecasts: ICityForecast[] } {
    const generator = new ForecastGenerator();
    const forecasts =  [
      generator.nextCityForecast('Kyiv'),
      generator.nextCityForecast('Kyiv'),
      generator.nextCityForecast('Kyiv'),
      generator.nextCityForecast('Kyiv'),
      generator.nextCityForecast('London'),
      generator.nextCityForecast('London'),
      generator.nextCityForecast('London'),
      generator.nextCityForecast('London'),
      generator.nextCityForecast('Paris'),
      generator.nextCityForecast('Paris'),
      generator.nextCityForecast('Paris'),
      generator.nextCityForecast('Paris')
    ];

    return { forecasts };
  }
}

class ForecastGenerator {
  private lastId = 1;
  private lastDateByCity: {[key: string]: Date} = {};

  nextCityForecast(desiredCityName: string): ICityForecast {
    return {
      id:  this.lastId++,
      cityName: desiredCityName,
      date: this.nextDate(desiredCityName),
      forecastsByHour: this.randomForcastsByHour()
    };
  }

  private nextDate(cityName: string): Date {
    const lastDate = this.lastDateByCity[cityName];
    let nextDate: Date;
    if (lastDate) {
      nextDate = new Date(lastDate);
      nextDate.setHours(lastDate.getHours() + 24);
    } else {
      nextDate = new Date(this.getRandomInt(2099), this.getRandomInt(12) + 1);
    }
    this.lastDateByCity[cityName] = nextDate;
    return nextDate;
  }

  private randomForcastsByHour(): {[key: number]: IForecast} {
    return {
      2: this.randomForecast(),
      5: this.randomForecast(),
      10: this.randomForecast(),
      15: this.randomForecast(),
      20: this.randomForecast(),
      23: this.randomForecast()
    };
  }

  private randomForecast(): IForecast {
    return {
      tempCelsius: this.getRandomInt(50),
      humidityPercent: this.getRandomInt(100),
      windSpeed: this.getRandomInt(20),
      weather: ['sunny', 'cloudy', 'raining'][this.getRandomInt(3)] as any
    };
  }

  /**
   * 0 is included, max is excluded
   */
  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
