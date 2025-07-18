import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { TokenStoreService } from '../services';
import { inject } from '@angular/core';

export const authenticationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const tokenStore = inject(TokenStoreService);
  const accessToken = tokenStore.getAccessToken();

  if (!accessToken) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    return next(modifiedReq);
  }

  return next(req);
};
