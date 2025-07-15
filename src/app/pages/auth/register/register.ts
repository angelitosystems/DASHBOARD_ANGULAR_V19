import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import {
  HlmCardDirective,
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { HlmFormFieldComponent } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideEye,
  lucideEyeOff,
  lucideUser,
  lucideLock,
  lucideMail,
  lucideUserPlus,
} from '@ng-icons/lucide';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'angelitosystems-register',
  imports: [
    ReactiveFormsModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmFormFieldComponent,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    HlmIconDirective,
    NgIcon,
  ],
  providers: [
    provideIcons({
      lucideEye,
      lucideEyeOff,
      lucideUser,
      lucideLock,
      lucideMail,
      lucideUserPlus,
    }),
  ],
  templateUrl: './register.html',
})
export class Register {
  registerForm: FormGroup;
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        acceptTerms: [false, [Validators.requiredTrue]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      
      const userData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        password_confirmation: this.registerForm.value.confirmPassword
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.toastService.success(
            `¡Cuenta creada exitosamente! Bienvenido ${response.user.name}`,
            'Registro completado'
          );
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading.set(false);
          
          let errorMessage = 'Ha ocurrido un error inesperado durante el registro';
          
          if (error.status === 422) {
            // Errores de validación
            if (error.error?.errors) {
              const errors = error.error.errors;
              if (errors.email) {
                errorMessage = 'Este email ya está registrado. Intenta con otro email.';
              } else if (errors.password) {
                errorMessage = 'La contraseña no cumple con los requisitos mínimos.';
              } else {
                errorMessage = 'Los datos proporcionados no son válidos.';
              }
            } else {
              errorMessage = 'Los datos proporcionados no son válidos.';
            }
          } else if (error.status === 429) {
            errorMessage = 'Demasiados intentos. Intenta nuevamente más tarde.';
          } else if (error.status === 0) {
            errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
          }
          
          this.toastService.error(
            errorMessage,
            'Error de registro'
          );
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
