import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ACCESS_TOKEN_KEY } from '../constants';

@Injectable({ providedIn: 'root' })
export class TokenStoreService {
  private readonly cookieService = inject(CookieService);

  getAccessToken(): string {
    return this.cookieService.get(ACCESS_TOKEN_KEY);
  }

  saveAccessToken(accessToken: string): void {
    this.cookieService.set(ACCESS_TOKEN_KEY, accessToken);
  }

  removeAccessToken(): void {
    this.cookieService.delete(ACCESS_TOKEN_KEY);
  }
}
