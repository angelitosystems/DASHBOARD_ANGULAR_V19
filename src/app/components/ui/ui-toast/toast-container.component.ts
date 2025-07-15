import { Component, computed, input, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ToastService, Toast } from '../../../services/toast.service';
import { ToastItemComponent } from './toast-item.component';

export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

@Component({
  selector: 'app-toast-container',
  imports: [
    NgFor,
    NgIf,
    ToastItemComponent
  ],
  template: `
    <div 
      class="toast-container"
      [class]="_positionClasses()"
      [attr.data-position]="position()"
    >
      <app-toast-item
        *ngFor="let toast of toasts(); trackBy: trackByToastId"
        [toast]="toast"
        (dismiss)="onToastDismiss($event)"
        (actionClick)="onToastAction($event)"
        class="toast-wrapper"
      />
    </div>
  `,
  styles: [`
    .toast-container {
      @apply fixed z-50 pointer-events-none;
      @apply flex flex-col gap-2;
      max-height: 100vh;
      overflow: hidden;
    }

    .toast-container[data-position="top-left"] {
      @apply top-4 left-4;
    }

    .toast-container[data-position="top-center"] {
      @apply top-4 left-1/2 transform -translate-x-1/2;
    }

    .toast-container[data-position="top-right"] {
      @apply top-4 right-4;
    }

    .toast-container[data-position="bottom-left"] {
      @apply bottom-4 left-4;
      flex-direction: column-reverse;
    }

    .toast-container[data-position="bottom-center"] {
      @apply bottom-4 left-1/2 transform -translate-x-1/2;
      flex-direction: column-reverse;
    }

    .toast-container[data-position="bottom-right"] {
      @apply bottom-4 right-4;
      flex-direction: column-reverse;
    }

    .toast-wrapper {
      @apply pointer-events-auto;
      @apply transform transition-all duration-300 ease-in-out;
    }

    /* Animaciones de entrada */
    .toast-wrapper:not(.toast-leaving) {
      animation: toast-slide-in 0.3s ease-out forwards;
    }

    .toast-wrapper.toast-leaving {
      animation: toast-slide-out 0.3s ease-in forwards;
    }

    /* Animaciones para diferentes posiciones */
    .toast-container[data-position*="right"] .toast-wrapper {
      transform-origin: right center;
    }

    .toast-container[data-position*="left"] .toast-wrapper {
      transform-origin: left center;
    }

    .toast-container[data-position*="center"] .toast-wrapper {
      transform-origin: center center;
    }

    @keyframes toast-slide-in {
      from {
        opacity: 0;
        transform: translateX(100%) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    @keyframes toast-slide-out {
      from {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateX(100%) scale(0.95);
      }
    }

    /* Animaciones para posiciones izquierdas */
    .toast-container[data-position*="left"] .toast-wrapper {
      @keyframes toast-slide-in {
        from {
          opacity: 0;
          transform: translateX(-100%) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }

      @keyframes toast-slide-out {
        from {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateX(-100%) scale(0.95);
        }
      }
    }

    /* Animaciones para posiciones centrales */
    .toast-container[data-position*="center"] .toast-wrapper {
      @keyframes toast-slide-in {
        from {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes toast-slide-out {
        from {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
      }
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      .toast-container {
        @apply left-4 right-4;
        @apply transform-none;
      }

      .toast-container[data-position*="center"] {
        @apply left-4 right-4;
        @apply transform-none;
      }
    }
  `]
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  position = input<ToastPosition>('bottom-right');
  maxToasts = input<number>(5);

  protected toasts = computed(() => {
    const allToasts = this.toastService.toasts$();
    const maxCount = this.maxToasts();
    
    // Limitar el número de toasts mostrados
    if (allToasts.length > maxCount) {
      return allToasts.slice(-maxCount);
    }
    
    return allToasts;
  });

  protected _positionClasses = computed(() => {
    const position = this.position();
    const baseClasses = 'toast-container';
    return `${baseClasses} toast-position-${position}`;
  });

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    // Configuración inicial si es necesaria
  }

  ngOnDestroy() {
    // Limpieza si es necesaria
  }

  onToastDismiss(toastId: string) {
    this.toastService.removeToast(toastId);
  }

  onToastAction(toastId: string) {
    // El toast item ya maneja la acción, aquí podemos agregar lógica adicional si es necesario
    console.log('Toast action clicked:', toastId);
  }

  trackByToastId(index: number, toast: Toast): string {
    return toast.id;
  }
}