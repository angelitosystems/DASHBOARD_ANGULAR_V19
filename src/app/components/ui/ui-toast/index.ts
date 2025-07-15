import { NgModule } from '@angular/core';
import { ToastItemComponent } from './toast-item.component';
import { ToastContainerComponent } from './toast-container.component';

export * from './toast-item.component';
export * from './toast-container.component';
export * from '../../../services/toast.service';

export const ToastImports = [
  ToastItemComponent,
  ToastContainerComponent
] as const;

@NgModule({
  imports: [...ToastImports],
  exports: [...ToastImports],
})
export class ToastModule {}