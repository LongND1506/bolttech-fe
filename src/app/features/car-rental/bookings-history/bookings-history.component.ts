import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BookingHistoryStore } from './booking.history.store';
import { DATE_FORMAT } from '@/app/shares/constants';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [TableModule, DatePipe],
  providers: [BookingHistoryStore],
  templateUrl: './bookings-history.component.html',
  styleUrls: ['./bookings-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsHistoryComponent {
  private bookingHistoryStore = inject(BookingHistoryStore);

  readonly bookings = this.bookingHistoryStore.bookings;
  readonly isLoading = this.bookingHistoryStore.isLoading;
  readonly DATE_FORMAT = DATE_FORMAT;
}
