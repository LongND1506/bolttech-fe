import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DATE_FORMAT } from '@/app/shares/constants';

@Component({
  standalone: true,
  imports: [ButtonModule, DatePipe],
  selector: 'app-confirm-booking-dialog',
  templateUrl: './confirm-booking-dialog.component.html',
  styleUrls: ['./confirm-booking-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmBookingDialogComponent {
  readonly dialogConfig = inject(DynamicDialogConfig);
  readonly dialogRef = inject(DynamicDialogRef);

  readonly DATE_FORMAT = DATE_FORMAT;
  readonly bookingData = this.dialogConfig.data.bookingData;
  readonly car = this.bookingData.car;
  readonly timeSlot = this.bookingData.timeSlot;
}
