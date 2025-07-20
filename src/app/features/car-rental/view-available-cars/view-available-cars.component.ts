import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DatePicker } from 'primeng/datepicker';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Tag } from 'primeng/tag';
import { filter, switchMap, take, tap } from 'rxjs';
import { AvailableCarsStore } from './available-cars.store';
import { ConfirmBookingDialogComponent } from './confirm-booking-dialog/confirm-booking-dialog.component';
import { Car } from '@/app/shares/models';
import { Divider } from 'primeng/divider';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    DatePicker,
    Tag,
    ReactiveFormsModule,
    ProgressSpinner,
    DynamicDialogModule,
    NgClass
  ],
  providers: [AvailableCarsStore, DialogService],
  templateUrl: './view-available-cars.component.html',
  styleUrl: './view-available-cars.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewAvailableCarsComponent {
  private readonly availableCarsStore = inject(AvailableCarsStore);
  private dialogService = inject(DialogService);

  readonly cars = this.availableCarsStore.cars;
  readonly isLoading = this.availableCarsStore.isLoading;
  readonly dateRangeControl = new FormControl<[Date, Date] | null>(null);

  constructor() {
    this.onDateSelect();
  }

  onDateSelect(): void {
    this.dateRangeControl.valueChanges
      .pipe(
        filter((val: Date[] | null) => !val || !!(val?.[0] && val?.[1])),
        tap((value) => {
          const [startDate, endDate] = value ?? [];

          this.availableCarsStore.getAvailableCars(value ? {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          } : undefined);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  onBookCar(car: Car): void {
    const bookingData = {
      car,
      timeSlot: this.dateRangeControl.value
    };

    const ref = this.dialogService.open(ConfirmBookingDialogComponent, {
      header: 'Confirm Your Booking',
      width: '300px',
      closable: true,
      appendTo: 'body',
      modal: true,
      data: {
        bookingData
      },
    });

    ref.onClose
      .pipe(
        filter((isConfirm) => isConfirm),
        switchMap(() => this.availableCarsStore.bookCar({
          carId: car.id,
          startDate: this.dateRangeControl.value?.[0].toISOString() ?? '',
          endDate: this.dateRangeControl.value?.[1].toISOString() ?? ''
        }))
      )
      .subscribe();
  }
}
