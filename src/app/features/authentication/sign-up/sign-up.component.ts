import { CreateUserPayload } from '@/app/shares/models';
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
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { SignUpStore } from './sign-up.store';
import { DRIVING_LICENSE_REGEX } from '@/app/shares/constants';

type FormType = Record<keyof CreateUserPayload, AbstractControl>;
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
    DatePickerModule,
    RouterLink,
  ],
  providers: [SignUpStore],
  templateUrl: './sign-up.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      @use '../../../shares/styles/layout.mixin.scss' as layout;

      :host {
        @include layout.auth-page-layout();
      }
    `,
  ],
})
export class SignUpComponent {
  private readonly signUpStore = inject(SignUpStore);
  readonly isSubmitting = this.signUpStore.isLoading;
  readonly signUpForm = new FormGroup<FormType>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    drivingLicense: new FormControl('', [Validators.required, Validators.pattern(DRIVING_LICENSE_REGEX)]),
    drivingLicenseExpiry: new FormControl('', [Validators.required]),
  });

  get emailControl(): FormControl {
    return this.signUpForm.get('email')! as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signUpForm.get('password')! as FormControl;
  }

  get drivingLicenseControl(): FormControl {
    return this.signUpForm.get('drivingLicense')! as FormControl;
  }

  get drivingLicenseExpiryControl(): FormControl {
    return this.signUpForm.get('drivingLicenseExpiry')! as FormControl;
  }

  signUp(): void {
    this.signUpStore.signUp(this.signUpForm.value as CreateUserPayload);
  }
}
