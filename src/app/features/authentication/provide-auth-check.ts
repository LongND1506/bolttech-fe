import { AuthApiService } from '@/app/shares/apis';
import { TokenStoreService } from '@/app/shares/services';
import { UserProfileStore } from '@/app/shares/stores';
import { inject, provideAppInitializer } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, tap } from 'rxjs';

const ignoreAuthPage = ['/sign-in', '/sign-up'];

export const provideAuthCheck = () =>
  provideAppInitializer(() => {
    const tokenStore = inject(TokenStoreService);
    const authApiService = inject(AuthApiService);
    const router = inject(Router);
    const userProfileStore = inject(UserProfileStore);
    const accessToken = tokenStore.getAccessToken();
    const path = window.location.pathname;

    if (ignoreAuthPage.includes(path)) {
      return Promise.resolve();
    }

    if (!accessToken) {
      return router.navigate(['sign-in']);
    }

    return firstValueFrom(
      authApiService
        .getCurrentUser()
        .pipe(tap((res) => userProfileStore.setUser(res)))
    );
  });
