import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models';
import { AuthApiService } from '../apis';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserProfileStore {
  private readonly authApi = inject(AuthApiService);
  readonly user = signal<User | null>(null);

  setUser(user: User) {
    this.user.set(user);
  }

  clearUser() {
    this.user.set(null);
  }

  getCurrentUser(): void {
    this.authApi
      .getCurrentUser()
      .pipe(tap((user) => this.setUser(user)))
      .subscribe();
  }
}
