import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmCardDirective, HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardFooterDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/helm/card';
import { HlmFormFieldComponent } from '@spartan-ng/helm/form-field';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEye, lucideEyeOff, lucideUser, lucideLock } from '@ng-icons/lucide';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'angelitosystems-login',
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
    NgIcon
  ],
  providers: [provideIcons({ lucideEye, lucideEyeOff, lucideUser, lucideLock })],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);

  private returnUrl: string = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    // Obtener la URL de retorno de los query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.toastService.success(
            `¡Bienvenido ${response.user.name}!`,
            'Inicio de sesión exitoso'
          );
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.isLoading.set(false);
          
          let errorMessage = 'Ha ocurrido un error inesperado';
          
          if (error.status === 401) {
            errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
          } else if (error.status === 422) {
            errorMessage = 'Los datos proporcionados no son válidos.';
          } else if (error.status === 429) {
            errorMessage = 'Demasiados intentos. Intenta nuevamente más tarde.';
          } else if (error.status === 0) {
            errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
          }
          
          this.toastService.error(
            errorMessage,
            'Error de autenticación'
          );
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}