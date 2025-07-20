import { Car } from './car.model';

export interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  car: Car;
}

export interface CreateBookingPayload
  extends Pick<Booking, 'startDate' | 'endDate'> {
  carId: string;
}
