import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICityForecast } from './data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  API_URL = 'api/';

  constructor(private httpClient: HttpClient) { }

  getCityNames(): Observable<string[]> {
    return of([]);
  }

  getAllCityForecasts(): Observable<ICityForecast[]> {
    return this.httpClient.get(`${this.API_URL + 'forecasts'}`).pipe(
      map(data => data as ICityForecast[])
    );
  }
}
