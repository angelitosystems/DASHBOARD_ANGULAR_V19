import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private toastCounter = 0;

  public toasts$ = this.toasts.asReadonly();

  constructor() {}

  /**
   * Mostrar toast de éxito
   */
  success(message: string, title?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'success',
      title,
      message,
      duration: 4000,
      dismissible: true,
      ...options
    });
  }

  /**
   * Mostrar toast de error
   */
  error(message: string, title?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'error',
      title,
      message,
      duration: 6000,
      dismissible: true,
      ...options
    });
  }

  /**
   * Mostrar toast de advertencia
   */
  warning(message: string, title?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'warning',
      title,
      message,
      duration: 5000,
      dismissible: true,
      ...options
    });
  }

  /**
   * Mostrar toast de información
   */
  info(message: string, title?: string, options?: Partial<Toast>): string {
    return this.addToast({
      type: 'info',
      title,
      message,
      duration: 4000,
      dismissible: true,
      ...options
    });
  }

  /**
   * Agregar toast personalizado
   */
  addToast(toast: Omit<Toast, 'id'>): string {
    const id = `toast-${++this.toastCounter}-${Date.now()}`;
    const newToast: Toast = {
      ...toast,
      id
    };

    this.toasts.update(toasts => [...toasts, newToast]);

    // Auto-dismiss si tiene duración
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, newToast.duration);
    }

    return id;
  }

  /**
   * Remover toast por ID
   */
  removeToast(id: string): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== id));
  }

  /**
   * Limpiar todos los toasts
   */
  clearAll(): void {
    this.toasts.set([]);
  }

  /**
   * Obtener toast por ID
   */
  getToast(id: string): Toast | undefined {
    return this.toasts().find(toast => toast.id === id);
  }
}