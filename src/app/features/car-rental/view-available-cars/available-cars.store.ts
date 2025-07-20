import { BookingApi, CarApi } from '@/app/shares/apis';
import {
  Car,
  CreateBookingPayload,
  ErrorResponse,
  GetCarsPayload,
} from '@/app/shares/models';
import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { orderBy } from 'lodash';

interface State {
  isLoading: boolean;
  cars: Car[];
}

const initialState: State = {
  isLoading: false,
  cars: [],
};

@Injectable()
export class AvailableCarsStore {
  private readonly carApi = inject(CarApi);
  private readonly bookingApi = inject(BookingApi);
  private readonly messageService = inject(MessageService);

  readonly state = signal<State>(initialState);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly cars = computed(() => this.state().cars);

  constructor() {
    this.getAvailableCars();
  }

  setLoading(isLoading: boolean): void {
    this.state.update((state) => ({ ...state, isLoading }));
  }

  getAvailableCars(payload?: GetCarsPayload): void {
    this.setLoading(true);
    this.carApi
      .getAvailableCars(payload)
      .pipe(
        tap((res) =>
          this.state.update((state) => ({ ...state, cars: orderBy(res, 'modelName') }))
        ),
        finalize(() => this.setLoading(false))
      )
      .subscribe();
  }

  bookCar(payload: CreateBookingPayload): Observable<unknown> {
    this.setLoading(true);

    return this.bookingApi.createBooking(payload).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Book Car Successfully',
        });

        this.getAvailableCars(payload ? {
          startDate: payload.startDate,
          endDate: payload.endDate
        } : undefined);
      }),
      catchError((err: ErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
        return throwError(() => err);
      }),
      finalize(() => this.setLoading(false))
    );
  }
}
