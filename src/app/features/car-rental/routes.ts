import { Routes } from '@angular/router';

export default [
  {
    path: 'view-available-cars',
    loadComponent: () =>
      import('./view-available-cars').then((m) => m.ViewAvailableCarsComponent),
  },
  {
    path: 'create-booking',
    loadComponent: () =>
      import('./create-booking').then((m) => m.CreateBookingComponent),
  },
  {
    path: '**',
    redirectTo: 'view-available-cars',
  },
] satisfies Routes;
