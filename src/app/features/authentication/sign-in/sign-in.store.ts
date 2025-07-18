import { AuthApiService } from '@/app/shares/apis';
import { ErrorResponse, SignInPayload } from '@/app/shares/models';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, finalize, of, tap } from 'rxjs';

interface State {
  isLoading: boolean;
}

@Injectable()
export class SignInStore {
  private readonly state = signal<State>({ isLoading: false });
  private readonly authApi = inject(AuthApiService);
  private readonly toastService = inject(MessageService);

  readonly isLoading = computed(() => this.state().isLoading);

  signIn(payload: SignInPayload): void {
    this.state.update((state) => ({ ...state, isLoading: true }));
    this.authApi
      .signIn(payload)
      .pipe(
        tap((res) => {
            if(res?.accessToken) {
               
            }
        }),
        catchError((err: HttpErrorResponse) => {
          this.toastService.add({
            severity: 'error',
            summary: 'Error',
            detail: (err.error as ErrorResponse).message,
          });

          return of(err);
        }),
        finalize(() =>
          this.state.update((state) => ({ ...state, isLoading: false }))
        )
      )
      .subscribe();
  }
}
