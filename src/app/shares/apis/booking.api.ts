import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../configs';
import { Booking, CreateBookingPayload, ErrorResponse } from '../models';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingApi {
  private readonly httpClient = inject(HttpClient);
  private readonly apiEndpoints = inject(API_ENDPOINTS);

  createBooking(payload: CreateBookingPayload): Observable<Booking> {
    return this.httpClient
      .post<Booking>(this.apiEndpoints.bookings, payload)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => err.error as ErrorResponse)
        )
      );
  }

  getBookingsHistory(): Observable<Booking[]> {
    return this.httpClient
      .get<Booking[]>(this.apiEndpoints.bookingsHistory)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => err.error as ErrorResponse)
        )
      );
  }
}
