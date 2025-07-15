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
  template: `
    <div class="min-h-screen flex items-center justify-center bg-background p-6 animate-fade-in">
      <div class="w-full max-w-md animate-slide-up">
        <div class="card-modern shadow-2xl border-0 overflow-hidden">
          <div class="p-8 text-center border-b border-border/50">
            <div class="mb-6">
              <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ng-icon hlm name="lucideUserPlus" size="lg" class="text-white" />
              </div>
            </div>
            <h1 class="text-3xl font-bold text-primary mb-2">Crear Cuenta</h1>
            <p class="text-muted-foreground text-lg">Regístrate para comenzar</p>
          </div>

          <div class="p-8 space-y-8">
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="space-y-3">
                <label hlmLabel for="name" class="text-sm font-semibold text-foreground">Nombre Completo</label>
                <div class="relative group">
                  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <ng-icon hlm name="lucideUser" size="sm" />
                  </div>
                  <input
                    hlmInput
                    id="name"
                    type="text"
                    formControlName="name"
                    placeholder="Tu nombre completo"
                    class="input-modern pl-12 h-12"
                  />
                </div>
              </div>

              <div class="space-y-3">
                <label hlmLabel for="email" class="text-sm font-semibold text-foreground">Correo Electrónico</label>
                <div class="relative group">
                  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <ng-icon hlm name="lucideMail" size="sm" />
                  </div>
                  <input
                    hlmInput
                    id="email"
                    type="email"
                    formControlName="email"
                    placeholder="tu@email.com"
                    class="input-modern pl-12 h-12"
                  />
                </div>
              </div>

              <div class="space-y-3">
                <label hlmLabel for="password" class="text-sm font-semibold text-foreground">Contraseña</label>
                <div class="relative group">
                  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <ng-icon hlm name="lucideLock" size="sm" />
                  </div>
                  <input
                    hlmInput
                    id="password"
                    [type]="showPassword() ? 'text' : 'password'"
                    formControlName="password"
                    placeholder="••••••••"
                    class="input-modern pl-12 pr-12 h-12"
                  />
                  <button
                    type="button"
                    (click)="togglePassword()"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <ng-icon hlm [name]="showPassword() ? 'lucideEyeOff' : 'lucideEye'" size="sm" />
                  </button>
                </div>
              </div>

              <div class="space-y-3">
                <label hlmLabel for="confirmPassword" class="text-sm font-semibold text-foreground">Confirmar Contraseña</label>
                <div class="relative group">
                  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200">
                    <ng-icon hlm name="lucideLock" size="sm" />
                  </div>
                  <input
                    hlmInput
                    id="confirmPassword"
                    [type]="showConfirmPassword() ? 'text' : 'password'"
                    formControlName="confirmPassword"
                    placeholder="••••••••"
                    class="input-modern pl-12 pr-12 h-12"
                  />
                  <button
                    type="button"
                    (click)="toggleConfirmPassword()"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <ng-icon hlm [name]="showConfirmPassword() ? 'lucideEyeOff' : 'lucideEye'" size="sm" />
                  </button>
                </div>
              </div>

              <div class="flex items-start space-x-3 py-2">
                <input
                  type="checkbox"
                  id="terms"
                  formControlName="acceptTerms"
                  class="w-4 h-4 mt-1 rounded border-2 border-border text-primary focus:ring-primary focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                />
                <label for="terms" class="text-sm text-muted-foreground leading-relaxed">
                  Acepto los
                  <a href="#" class="text-primary hover:text-primary/80 font-medium transition-colors duration-200">términos y condiciones</a>
                  y la
                  <a href="#" class="text-primary hover:text-primary/80 font-medium transition-colors duration-200">política de privacidad</a>
                </label>
              </div>

              <button
                hlmBtn
                type="submit"
                class="w-full btn-modern h-12 text-base font-semibold"
                [disabled]="registerForm.invalid || isLoading()"
              >
                <span class="flex items-center justify-center space-x-2">
                  @if (isLoading()) {
                    <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creando cuenta...</span>
                  } @else {
                    <ng-icon hlm name="lucideUserPlus" size="sm" />
                    <span>Crear Cuenta</span>
                  }
                </span>
              </button>
            </form>
          </div>

          <div class="p-8 pt-0 text-center">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-border/50"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-card px-4 text-muted-foreground">o</span>
              </div>
            </div>
            <p class="text-sm text-muted-foreground mt-6">
              ¿Ya tienes una cuenta?
              <a (click)="goToLogin()" class="text-primary hover:text-primary/80 cursor-pointer font-semibold transition-colors duration-200">Inicia sesión aquí</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Register {
  registerForm: FormGroup;
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);

  constructor(private fb: FormBuilder, private router: Router) {
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
      // Simular registro
      setTimeout(() => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
