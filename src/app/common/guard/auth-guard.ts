import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si hay token en localStorage
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  // Verificar si el usuario actual está disponible
  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      } else {
        // Si no hay usuario pero hay token, intentar obtener datos del usuario
        authService.getCurrentUser().subscribe({
          error: () => {
            // Si falla, limpiar datos y redirigir al login
            router.navigate(['/auth/login'], {
              queryParams: { returnUrl: state.url }
            });
          }
        });
        return true;
      }
    })
  );
};
