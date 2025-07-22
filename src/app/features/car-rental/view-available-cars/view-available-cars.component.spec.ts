import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ViewAvailableCarsComponent } from './view-available-cars.component';
import { AvailableCarsStore } from './available-cars.store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of, Subject } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Car } from '@/app/shares/models/car.model';
import { Injector, NO_ERRORS_SCHEMA, runInInjectionContext, signal } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule, NgIf } from '@angular/common';
import { DataView } from 'primeng/dataview';
import { Button, ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { Tag } from 'primeng/tag';
import { ProgressSpinner } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { NgClass } from '@angular/common';
import { NgModule } from '@angular/core';

// Mock AvailableCarsStore
class MockAvailableCarsStore {
  cars = () => [];
  isLoading = () => false;
  getAvailableCars = jasmine.createSpy('getAvailableCars');
  bookCar = jasmine.createSpy('bookCar').and.returnValue(of({}));
}

// Mock DialogService
class MockDialogRef {
  onClose = of(true);
}
class MockDialogService {
  open = jasmine.createSpy('open').and.returnValue(new MockDialogRef());
}

describe('ViewAvailableCarsComponent', () => {
  let component: ViewAvailableCarsComponent;
  let fixture: ComponentFixture<ViewAvailableCarsComponent>;
  let store: MockAvailableCarsStore;
  let dialogService: MockDialogService;

  beforeEach(async () => {
    await TestBed.overrideComponent(ViewAvailableCarsComponent, {
      set: {
        imports: [
          CommonModule,
          ReactiveFormsModule,
          DataView,
          Button,
          DatePicker,
          Tag,
          ReactiveFormsModule,
          ProgressSpinner,
          DynamicDialogModule,
          NgClass,
        ],
        providers: [
          {
            provide: AvailableCarsStore,
            useClass: MockAvailableCarsStore,
          },
          {
            provide: DialogService,
            useClass: MockDialogService,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      },
    });

    fixture = TestBed.createComponent(ViewAvailableCarsComponent);
    component = fixture.componentInstance;

    store = fixture.componentRef.injector.get(AvailableCarsStore) as any;
    dialogService = fixture.componentRef.injector.get(DialogService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAvailableCars when date range is selected', fakeAsync(() => {
    const start = new Date('2024-06-01');
    const end = new Date('2024-06-05');
    // Set value after component is initialized
    component.dateRangeControl.setValue([start, end]);
    fixture.detectChanges();
    tick(); 
    expect(store.getAvailableCars).toHaveBeenCalled();
  }));

  it('should open dialog and book car on confirmation', fakeAsync(() => {
    const car: Car = {
      id: '1',
      modelName: 'Model X',
      brand: 'Tesla',
      stock: 1,
      averagePricePerDay: 100,
      totalPrice: 200,
    };
    component.dateRangeControl.setValue([
      new Date('2024-06-01'),
      new Date('2024-06-05'),
    ]);
    fixture.detectChanges();
    component.onBookCar(car);

    tick();

    fixture.detectChanges();
    expect(dialogService.open).toHaveBeenCalledTimes(1);
    expect(store.bookCar).toHaveBeenCalledWith({
      carId: car.id,
      startDate: jasmine.any(String),
      endDate: jasmine.any(String),
    });
  }));
});