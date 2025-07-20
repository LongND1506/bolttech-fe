import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../configs';
import { Car, CreateCarPayload, GetCarsPayload } from '../models';

@Injectable({ providedIn: 'root' })
export class CarApi {
  private readonly httpClient = inject(HttpClient);
  private readonly apiEndpoints = inject(API_ENDPOINTS);

  getAvailableCars(payload?: GetCarsPayload): Observable<Car[]> {
    let params = new HttpParams();

    for (const key in payload) {
      params = params.set(key, (payload as Record<string, string | boolean>)[key]);
    }

    return this.httpClient.get<Car[]>(this.apiEndpoints.cars, {
      params,
    });
  }

  createNewCar(payload: CreateCarPayload): Observable<Car> {
    return this.httpClient.post<Car>(this.apiEndpoints.cars, payload);
  }
}
