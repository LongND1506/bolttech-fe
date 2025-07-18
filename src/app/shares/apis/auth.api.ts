import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../configs';
import {
  CreateUserPayload,
  SignInPayload,
  SignInResponse,
  User,
} from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  readonly httpClient = inject(HttpClient);
  readonly API_ENDPOINTS = inject(API_ENDPOINTS);

  signUp(payload: CreateUserPayload): Observable<User> {
    return this.httpClient.post<User>(this.API_ENDPOINTS.signUp, payload);
  }

  signIn(payload: SignInPayload): Observable<SignInResponse> {
    return this.httpClient.post<SignInResponse>(
      this.API_ENDPOINTS.signIn,
      payload
    );
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(this.API_ENDPOINTS.getCurrentUser);
  }
}
