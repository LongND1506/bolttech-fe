import Aura from '@primeuix/themes/aura';
import { Preset } from '@primeuix/themes/types';
import { providePrimeNG } from 'primeng/config';

export const provideTheme = (preset?: Preset) =>
  providePrimeNG({
    ripple: true,
    theme: {
      preset: preset ?? Aura,
      options: {
        prefix: 'p',
        darkModeSelector: false,
        cssLayer: false,
      },
    },
  });
