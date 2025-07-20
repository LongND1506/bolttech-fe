import { env } from '@/environments/environment';
import { InjectionToken } from '@angular/core';

export const API_ENDPOINTS_CONFIG = {
  cars: '/cars',
  bookings: '/bookings',
  bookingsHistory: '/bookings/history',
  getBookingById: '/bookings/:id',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  getCurrentUser: '/auth/user-profile',
};

type ApiConfigType = Record<keyof typeof API_ENDPOINTS_CONFIG, string>;
export const API_ENDPOINTS = new InjectionToken<ApiConfigType>('API_ENDPOINTS', {
  providedIn: 'root',
  factory: () =>
    Object.keys(API_ENDPOINTS_CONFIG).reduce(
      (acc, key) => ({
        ...acc,
        [key]: env.apiUrl + (API_ENDPOINTS_CONFIG as Record<string, string>)[key],
      }),
      {}
    ) as ApiConfigType,
});
