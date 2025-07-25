import { Routes } from '@angular/router';

export default [
  {
    path: 'available-cars',
    loadComponent: () =>
      import('./view-available-cars').then((m) => m.ViewAvailableCarsComponent),
  },
  {
    path: 'bookings-history',
    loadComponent: () =>
      import('./bookings-history').then((m) => m.BookingsHistoryComponent),
  },
  {
    path: 'cars-management',
    loadComponent: () =>
      import('./cars-management').then((m) => m.CarsManagementComponent),
  },
  {
    path: '**',
    redirectTo: 'available-cars',
  },
] satisfies Routes;
