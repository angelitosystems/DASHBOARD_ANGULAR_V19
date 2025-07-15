import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export const backendInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo interceptar peticiones que no tengan una URL completa
  if (req.url.startsWith('http')) {
    return next(req);
  }

  // Construir la URL completa
  let apiUrl: string;
  
  // Las rutas de Sanctum no necesitan el prefijo /api/v1
  if (req.url.startsWith('/sanctum/')) {
    apiUrl = `${environment.apiUrl.replace('/api/v1', '')}${req.url}`;
  } else {
    apiUrl = `${environment.apiUrl}/${req.url.replace(/^\//, '')}`;
  }

  // Obtener el token de autenticación del localStorage
  const token = localStorage.getItem('auth_token');
  
  // Obtener el token CSRF de Laravel
  // Laravel proporciona el token CSRF a través de cookies o meta tags
  const csrfToken = getCsrfToken();

  // Preparar headers base
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };

  // Agregar token de autenticación si existe
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Agregar token CSRF para peticiones que lo requieren
  if (csrfToken && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
    headers['X-CSRF-TOKEN'] = csrfToken;
  }

  // Clonar la petición con la nueva URL y headers
  const modifiedReq = req.clone({
    url: apiUrl,
    setHeaders: headers
  });

  return next(modifiedReq);
};

/**
 * Obtener el token CSRF de Laravel
 * Laravel puede proporcionar el token a través de:
 * 1. Meta tag en el HTML
 * 2. Cookie XSRF-TOKEN
 * 3. localStorage (si se guardó previamente)
 */
function getCsrfToken(): string | null {
  // 1. Intentar obtener del meta tag
  const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (metaToken) {
    return metaToken;
  }

  // 2. Intentar obtener de la cookie XSRF-TOKEN (Laravel Sanctum)
  const xsrfToken = getCookie('XSRF-TOKEN');
  if (xsrfToken) {
    return decodeURIComponent(xsrfToken);
  }

  // 3. Intentar obtener del localStorage
  const storedToken = localStorage.getItem('csrf_token');
  if (storedToken) {
    return storedToken;
  }

  return null;
}

/**
 * Obtener valor de una cookie por nombre
 */
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}
