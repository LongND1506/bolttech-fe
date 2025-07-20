import { BookingApi } from '@/app/shares/apis';
import { Booking, ErrorResponse } from '@/app/shares/models';
import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, finalize, of, tap } from 'rxjs';

interface State {
  isLoading: boolean;
  bookings: Booking[];
}

const initialState: State = {
  isLoading: false,
  bookings: [],
};

@Injectable()
export class BookingHistoryStore {
  private readonly bookingApi = inject(BookingApi);
  private readonly messageService = inject(MessageService);

  readonly state = signal<State>(initialState);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly bookings = computed(() => this.state().bookings);

  constructor() {
    this.getBookingsHistory();
  }

  setLoading(isLoading: boolean): void {
    this.state.update((state) => ({ ...state, isLoading }));
  }

  getBookingsHistory(): void {
    this.setLoading(true);
    this.bookingApi
      .getBookingsHistory()
      .pipe(
        tap((res) =>
          this.state.update((state) => ({ ...state, bookings: res }))
        ),
        catchError((err: ErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          });
          return of(err);
        }),
        finalize(() => this.setLoading(false))
      )
      .subscribe();
  }
}
