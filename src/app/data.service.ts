import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { RequestInfo } from 'angular-in-memory-web-api/interfaces';

export interface IForecast {
  tempCelsius: number;
  humidityPercent: number;
  windSpeed: number;
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
    const forecasts =  [
      H.nextCityForecast('Kyiv'),
      H.nextCityForecast('Kyiv'),
      H.nextCityForecast('Kyiv'),
      H.nextCityForecast('Kyiv'),
      H.nextCityForecast('London'),
      H.nextCityForecast('London'),
      H.nextCityForecast('London'),
      H.nextCityForecast('London'),
      H.nextCityForecast('Paris'),
      H.nextCityForecast('Paris'),
      H.nextCityForecast('Paris'),
      H.nextCityForecast('Paris')
    ];

    return { forecasts };
  }
}

class H {
  static lastId = 1;
  static lastDateByCity: {[key: string]: Date} = {};

  static nextCityForecast(desiredCityName: string): ICityForecast {
    return {
      id:  H.lastId++,
      cityName: desiredCityName,
      date: H.nextDate(desiredCityName),
      forecastsByHour: H.randomForcastsByHour()
    };
  }

  static nextDate(cityName: string): Date {
    const lastDate = H.lastDateByCity[cityName];
    let nextDate: Date;
    if (lastDate) {
      nextDate = new Date(lastDate);
      nextDate.setHours(lastDate.getHours() + 24);
    } else {
      nextDate = new Date();
    }
    H.lastDateByCity[cityName] = nextDate;
    return nextDate;
  }

  static randomForcastsByHour(): {[key: number]: IForecast} {
    return {
      2: H.randomForecast(),
      5: H.randomForecast(),
      10: H.randomForecast(),
      15: H.randomForecast(),
      20: H.randomForecast(),
      23: H.randomForecast()
    };
  }

  static randomForecast(): IForecast {
    return {
      tempCelsius: H.getRandomInt(50),
      humidityPercent: H.getRandomInt(100),
      windSpeed: H.getRandomInt(20)
    };
  }

  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
