import { Component, input, output, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  lucideCheck, 
  lucideX, 
  lucideCircleAlert, 
  lucideInfo,
  lucideCircleX
} from '@ng-icons/lucide';
import { Toast } from '../../../services/toast.service';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-toast-item',
  imports: [
    NgClass,
    NgIf,
    NgIcon,
    HlmButtonDirective,
    HlmIconDirective
  ],
  providers: [
    provideIcons({ 
      lucideCheck, 
      lucideX, 
      lucideCircleAlert, 
      lucideInfo,
      lucideCircleX
    })
  ],
  template: `
    <div 
      [ngClass]="_computedClasses()"
      class="toast-item"
      [attr.data-type]="toast().type"
      [attr.data-dismissible]="toast().dismissible"
    >
      <!-- Icono del tipo de toast -->
      <div class="toast-icon">
        <ng-icon 
          hlm
          [name]="_iconName()"
          size="sm"
          [ngClass]="_iconClasses()"
        />
      </div>

      <!-- Contenido del toast -->
      <div class="toast-content">
        <div *ngIf="toast().title" class="toast-title">
          {{ toast().title }}
        </div>
        <div class="toast-message">
          {{ toast().message }}
        </div>
      </div>

      <!-- Botón de acción (opcional) -->
      <div *ngIf="toast().action" class="toast-action">
        <button
          hlmBtn
          variant="ghost"
          size="sm"
          (click)="onActionClick()"
          class="toast-action-btn"
        >
          {{ toast().action?.label }}
        </button>
      </div>

      <!-- Botón de cerrar -->
      <div *ngIf="toast().dismissible" class="toast-close">
        <button
          hlmBtn
          variant="ghost"
          size="sm"
          (click)="onDismiss()"
          class="toast-close-btn"
        >
          <ng-icon hlm name="lucideX" size="xs" />
        </button>
      </div>

      <!-- Barra de progreso (opcional) -->
      <div 
        *ngIf="toast().duration && toast().duration! > 0"
        class="toast-progress"
        [style.animation-duration.ms]="toast().duration"
      ></div>
    </div>
  `,
  styles: [`
    .toast-item {
      @apply relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm;
      @apply bg-background/95 text-foreground border-border;
      @apply transition-all duration-300 ease-in-out;
      @apply transform translate-x-0 opacity-100;
      min-width: 300px;
      max-width: 500px;
    }

    .toast-item[data-type="success"] {
      @apply border-green-200 bg-green-50/95 dark:border-green-800 dark:bg-green-950/95;
    }

    .toast-item[data-type="error"] {
      @apply border-red-200 bg-red-50/95 dark:border-red-800 dark:bg-red-950/95;
    }

    .toast-item[data-type="warning"] {
      @apply border-yellow-200 bg-yellow-50/95 dark:border-yellow-800 dark:bg-yellow-950/95;
    }

    .toast-item[data-type="info"] {
      @apply border-blue-200 bg-blue-50/95 dark:border-blue-800 dark:bg-blue-950/95;
    }

    .toast-icon {
      @apply flex-shrink-0 mt-0.5;
    }

    .toast-content {
      @apply flex-1 min-w-0;
    }

    .toast-title {
      @apply font-semibold text-sm mb-1 text-foreground;
    }

    .toast-message {
      @apply text-sm text-muted-foreground leading-relaxed;
    }

    .toast-action {
      @apply flex-shrink-0;
    }

    .toast-action-btn {
      @apply text-xs font-medium;
    }

    .toast-close {
      @apply flex-shrink-0 -mt-1 -mr-1;
    }

    .toast-close-btn {
      @apply h-6 w-6 p-0 text-muted-foreground hover:text-foreground;
    }

    .toast-progress {
      @apply absolute bottom-0 left-0 h-1 bg-primary rounded-b-lg;
      animation: toast-progress linear forwards;
      width: 100%;
    }

    @keyframes toast-progress {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }

    /* Animaciones de entrada y salida */
    .toast-item.toast-enter {
      @apply transform translate-x-full opacity-0;
    }

    .toast-item.toast-leave {
      @apply transform translate-x-full opacity-0;
    }

    /* Estados de hover */
    .toast-item:hover .toast-progress {
      animation-play-state: paused;
    }
  `]
})
export class ToastItemComponent implements OnInit, OnDestroy {
  toast = input.required<Toast>();
  dismiss = output<string>();
  actionClick = output<string>();

  private _isVisible = signal(false);

  ngOnInit() {
    // Trigger entrada animation
    setTimeout(() => this._isVisible.set(true), 10);
  }

  ngOnDestroy() {
    this._isVisible.set(false);
  }

  protected _computedClasses = computed(() => {
    const baseClasses = 'toast-item';
    const visibilityClass = this._isVisible() ? '' : 'toast-enter';
    return `${baseClasses} ${visibilityClass}`.trim();
  });

  protected _iconName = computed(() => {
    const iconMap = {
      success: 'lucideCheck',
      error: 'lucideCircleX',
      warning: 'lucideCircleAlert',
      info: 'lucideInfo'
    };
    return iconMap[this.toast().type];
  });

  protected _iconClasses = computed(() => {
    const classMap = {
      success: 'text-green-600 dark:text-green-400',
      error: 'text-red-600 dark:text-red-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      info: 'text-blue-600 dark:text-blue-400'
    };
    return classMap[this.toast().type];
  });

  onDismiss() {
    this._isVisible.set(false);
    setTimeout(() => {
      this.dismiss.emit(this.toast().id);
    }, 300); // Esperar a que termine la animación
  }

  onActionClick() {
    const action = this.toast().action;
    if (action) {
      action.handler();
      this.actionClick.emit(this.toast().id);
    }
  }
}