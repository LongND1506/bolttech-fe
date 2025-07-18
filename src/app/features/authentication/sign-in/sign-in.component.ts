import { SignInPayload } from '@/app/shares/models';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { SignInStore } from './sign-in.store';

type FormType = Record<string, AbstractControl>;
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    CardModule,
    MessageModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    RouterLink,
  ],
  providers: [SignInStore],
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      @use '../../../shares/styles/layout.mixin.scss' as layout;
      :host {
        @include layout.auth-page-layout;
      }
    `,
  ],
})
export class SignInComponent {
  private readonly signInStore = inject(SignInStore);
  readonly isSubmitting = this.signInStore.isLoading;
  readonly signInForm = new FormGroup<FormType>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get emailControl(): FormControl {
    return this.signInForm.get('email')! as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signInForm.get('password')! as FormControl;
  }

  signIn(): void {
    this.signInStore.signIn(this.signInForm.value as SignInPayload);
  }
}
