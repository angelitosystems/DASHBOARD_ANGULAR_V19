import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, switchMap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
  };
  token: string;
  token_type: string;
  expires_in?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar si hay un token guardado al inicializar el servicio
    this.checkStoredAuth();
  }

  /**
   * Obtener token CSRF de Laravel
   * Endpoint Laravel: GET /sanctum/csrf-cookie
   */
  getCsrfToken(): Observable<any> {
    return this.http.get('/sanctum/csrf-cookie', { 
      withCredentials: true 
    });
  }

  /**
   * Iniciar sesión
   * Endpoint Laravel: POST /api/v1/auth/login
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Primero obtener el token CSRF, luego hacer login
    return this.getCsrfToken().pipe(
      switchMap(() => 
        this.http.post<AuthResponse>('auth/login', credentials, {
          withCredentials: true
        })
      ),
      tap(response => {
        this.setAuthData(response);
      })
    );
  }

  /**
   * Registrar nuevo usuario
   * Endpoint Laravel: POST /api/v1/auth/register
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Primero obtener el token CSRF, luego hacer registro
    return this.getCsrfToken().pipe(
      switchMap(() => 
        this.http.post<AuthResponse>('auth/register', userData, {
          withCredentials: true
        })
      ),
      tap(response => {
        this.setAuthData(response);
      })
    );
  }

  /**
   * Cerrar sesión
   * Endpoint Laravel: POST /api/v1/auth/logout
   */
  logout(): Observable<any> {
    return this.http.post('auth/logout', {})
      .pipe(
        tap(() => {
          this.clearAuthData();
        })
      );
  }

  /**
   * Obtener información del usuario autenticado
   * Endpoint Laravel: GET /api/v1/auth/user
   */
  getCurrentUser(): Observable<User> {
    return this.http.get<User>('auth/user')
      .pipe(
        tap(user => {
          this.currentUserSubject.next(user);
        })
      );
  }

  /**
   * Refrescar token
   * Endpoint Laravel: POST /api/v1/auth/refresh
   */
  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('auth/refresh', {})
      .pipe(
        tap(response => {
          this.setAuthData(response);
        })
      );
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  /**
   * Obtener el token actual
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Obtener el usuario actual
   */
  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Guardar datos de autenticación
   */
  private setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem('auth_token', authResponse.token);
    localStorage.setItem('user_data', JSON.stringify(authResponse.user));
    this.currentUserSubject.next(authResponse.user);
  }

  /**
   * Limpiar datos de autenticación
   */
  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

  /**
   * Verificar autenticación almacenada
   */
  private checkStoredAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        // Si hay error al parsear, limpiar datos
        this.clearAuthData();
      }
    }
  }
}