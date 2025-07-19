import { TokenStoreService } from '@/app/shares/services';
import { inject, provideAppInitializer } from '@angular/core';
import { Router } from '@angular/router';

const ignoreAuthPage = ['/dash-board/sign-in', '/dash-board/sign-up'];

export const provideAuthCheck = () =>
  provideAppInitializer(() => {
    const tokenStore = inject(TokenStoreService);
    const router = inject(Router);
    const accessToken = tokenStore.getAccessToken();
    const path = window.location.pathname;

    if (!accessToken && !ignoreAuthPage.includes(path)) {
      return router.navigate(['sign-in']);
    }

    if(accessToken && ignoreAuthPage.includes(path)) {
      return router.navigate(['/'])
    }

    return Promise.resolve();
  });
