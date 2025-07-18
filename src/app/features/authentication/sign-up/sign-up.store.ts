import { AuthApiService } from '@/app/shares/apis';
import { CreateUserPayload, ErrorResponse } from '@/app/shares/models';
import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, finalize, of, tap } from 'rxjs';

interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

@Injectable()
export class SignUpStore {
  private readonly authApi = inject(AuthApiService);
  private readonly toastService = inject(MessageService);
  private readonly state = signal<State>(initialState);
  readonly isLoading = computed(() => this.state().isLoading);

  signUp(payload: CreateUserPayload): void {
    this.state.update((state) => ({ ...state, isLoading: true }));
    this.authApi
      .signUp(payload)
      .pipe(
        tap(res => {
          this.toastService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Sign Up Successfully',
          });
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
