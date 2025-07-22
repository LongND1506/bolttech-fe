import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AvailableCarsStore } from './available-cars.store';
import { CarApi } from '@/app/shares/apis/car.api';
import { BookingApi } from '@/app/shares/apis/booking.api';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Car } from '@/app/shares/models/car.model';
import { CreateBookingPayload } from '@/app/shares/models/booking.model';
import { ErrorResponse } from '@/app/shares/models/error.model';

const mockCars: Car[] = [
  {
    id: '1',
    modelName: 'Model X',
    brand: 'Tesla',
    stock: 2,
    averagePricePerDay: 100,
    totalPrice: 200,
  },
  {
    id: '2',
    modelName: 'Model S',
    brand: 'Tesla',
    stock: 1,
    averagePricePerDay: 120,
    totalPrice: 120,
  },
];

const mockBookingPayload: CreateBookingPayload = {
  carId: '1',
  startDate: '2024-06-01',
  endDate: '2024-06-05',
};

const mockError: ErrorResponse = {
  error: 'Bad Request',
  statusCode: 400,
  message: 'Booking failed',
};

describe('AvailableCarsStore', () => {
  let store: AvailableCarsStore;
  let carApi: jasmine.SpyObj<CarApi>;
  let bookingApi: jasmine.SpyObj<BookingApi>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    carApi = jasmine.createSpyObj('CarApi', ['getAvailableCars']);
    bookingApi = jasmine.createSpyObj('BookingApi', ['createBooking']);
    messageService = jasmine.createSpyObj('MessageService', ['add']);

    carApi.getAvailableCars.and.returnValue(of(mockCars));

    TestBed.configureTestingModule({
      providers: [
        AvailableCarsStore,
        { provide: CarApi, useValue: carApi },
        { provide: BookingApi, useValue: bookingApi },
        { provide: MessageService, useValue: messageService },
      ],
    });

    store = TestBed.inject(AvailableCarsStore);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should fetch available cars on init', () => {
    expect(carApi.getAvailableCars).toHaveBeenCalled();
    expect(store.cars().length).toBe(2);
    expect(store.cars()[0].modelName).toBe('Model S'); // Sorted by modelName
  }); 

  it('should book a car successfully and refresh cars', (done) => {
    const mockBooking = {
      id: 'booking-1',
      startDate: mockBookingPayload.startDate,
      endDate: mockBookingPayload.endDate,
      car: mockCars[0]
    };
    bookingApi.createBooking.and.returnValue(of(mockBooking));
    carApi.getAvailableCars.and.returnValue(of(mockCars));
    store.bookCar(mockBookingPayload).subscribe({
      next: () => {
        expect(messageService.add).toHaveBeenCalledWith(jasmine.objectContaining({
          severity: 'success',
        }));
        expect(carApi.getAvailableCars).toHaveBeenCalledWith({
          startDate: mockBookingPayload.startDate,
          endDate: mockBookingPayload.endDate,
        });
        expect(store.isLoading()).toBe(false);
        done();
      },
      error: () => {
        fail('Should not error');
        done();
      },
    });
  });

  it('should handle error when booking a car', (done) => {
    bookingApi.createBooking.and.returnValue(throwError(() => mockError));
    
    store.bookCar(mockBookingPayload).subscribe({
      next: () => {
        fail('Should not succeed');
        done();
      },
      error: (err) => {
        expect(messageService.add).toHaveBeenCalledWith(jasmine.objectContaining({
          severity: 'error',
          detail: mockError.message,
        }));
        expect(err).toEqual(mockError);
        done();
      },
    });
  });
});