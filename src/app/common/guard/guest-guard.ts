import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state): Observable<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (authService.isAuthenticated()) {
    return authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user) {
          router.navigate(['/dashboard']);
          return false;
        }
        return true;
      })
    );
  }

  return true;
};