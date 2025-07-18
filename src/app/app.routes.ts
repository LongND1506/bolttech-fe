import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dash-board/dash-board.component').then(
        (m) => m.DashBoardComponent
      ),
    loadChildren: () => import('./features/car-rental/routes'),
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./features/authentication/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./features/authentication/sign-up/sign-up.component').then(
        (m) => m.SignUpComponent
      ),
  },
];
