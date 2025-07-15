import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  data: User[];
  stats: {
    total: number;
    active: number;
    new_today: number;
  };
}

export interface DashboardStats {
  users: number;
  active_users: number;
  departments: number;
  recent_activity: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Obtener lista de usuarios con paginación
   * Endpoint Laravel: GET /api/v1/users
   */
  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>('users');
  }

  /**
   * Obtener un usuario específico
   * Endpoint Laravel: GET /api/v1/users/{id}
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`users/${id}`);
  }

  /**
   * Crear un nuevo usuario
   * Endpoint Laravel: POST /api/v1/users
   */
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>('users', user);
  }

  /**
   * Actualizar un usuario existente
   * Endpoint Laravel: PUT /api/v1/users/{id}
   */
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`users/${id}`, user);
  }

  /**
   * Eliminar un usuario
   * Endpoint Laravel: DELETE /api/v1/users/{id}
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`users/${id}`);
  }

  /**
   * Obtener estadísticas del dashboard
   * Endpoint Laravel: GET /api/v1/dashboard-stats
   */
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>('dashboard-stats');
  }

  /**
   * Buscar usuarios
   * Endpoint Laravel: GET /api/v1/users/search?q={query}
   */
  searchUsers(query: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`users/search?q=${encodeURIComponent(query)}`);
  }
}