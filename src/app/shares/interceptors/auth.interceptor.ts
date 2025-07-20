import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { TokenStoreService } from '../services';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authenticationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const tokenStore = inject(TokenStoreService);
  const router = inject(Router);
  const accessToken = tokenStore.getAccessToken();

  if (accessToken) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      //Handle Unauthorized error
      console.log(err);
      if (err.status === 401) {
        tokenStore.removeAccessToken();
        router.navigate(['sign-in']);
      }

      //Handle other errors here

      return throwError(() => err);
    })
  );
};
