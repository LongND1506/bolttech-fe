import { Injectable, signal } from '@angular/core';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserProfileStore {
  readonly user = signal<User | null>(null);

  setUser(user: User) {
    this.user.set(user);
  }

  clearUser() {
    this.user.set(null);
  }
}
