import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HlmCardDirective, HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/helm/card';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmLabelDirective } from '@spartan-ng/helm/label';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { BrnSwitchImports } from '@spartan-ng/brain/switch';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSeparatorDirective } from '@spartan-ng/helm/separator';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  lucideUser,
  lucidePalette,
  lucideBell,
  lucideShield,
  lucideGlobe,
  lucideSave,
  lucideCamera,
  lucideEye,
  lucideEyeOff,
  lucideCheck,
  lucideX,
  lucideMoon,
  lucideSun,
  lucideMonitor
} from '@ng-icons/lucide';

@Component({
  selector: 'angelitosystems-settings',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmIconDirective,
    HlmBadgeDirective,
    HlmSeparatorDirective,
    BrnSwitchImports,
    HlmSwitchImports,
    BrnSelectImports,
    HlmSelectImports,
    NgIcon
  ],
  providers: [provideIcons({ 
    lucideUser,
    lucidePalette,
    lucideBell,
    lucideShield,
    lucideGlobe,
    lucideSave,
    lucideCamera,
    lucideEye,
    lucideEyeOff,
    lucideCheck,
    lucideX,
    lucideMoon,
    lucideSun,
    lucideMonitor
  })],
  templateUrl: './settings.html',
})
export class Settings {
  private fb = new FormBuilder();
  
  activeSection = signal('profile');
  selectedTheme = signal('system');
  selectedLanguage = 'es';
  selectedFontSize = 'medium';
  twoFactorEnabled = signal(false);
  
  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);
  
  profileForm: FormGroup;
  passwordForm: FormGroup;
  
  constructor() {
    this.profileForm = this.fb.group({
      firstName: ['Juan', Validators.required],
      lastName: ['Pérez', Validators.required],
      email: ['juan.perez@email.com', [Validators.required, Validators.email]],
      bio: ['Desarrollador apasionado por la tecnología y los datos.'],
      location: ['Madrid, España']
    });
    
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }
  
  settingSections = signal([
    { id: 'profile', name: 'Perfil', icon: 'lucideUser' },
    { id: 'appearance', name: 'Apariencia', icon: 'lucidePalette' },
    { id: 'notifications', name: 'Notificaciones', icon: 'lucideBell' },
    { id: 'security', name: 'Seguridad', icon: 'lucideShield' }
  ]);
  
  themes = signal([
    { value: 'light', name: 'Claro', icon: 'lucideSun', color: 'text-yellow-500' },
    { value: 'dark', name: 'Oscuro', icon: 'lucideMoon', color: 'text-blue-500' },
    { value: 'system', name: 'Sistema', icon: 'lucideMonitor', color: 'text-gray-500' }
  ]);
  
  notificationSettings = signal([
    {
      id: 'email',
      title: 'Notificaciones por Email',
      description: 'Recibe actualizaciones importantes por correo electrónico',
      enabled: true
    },
    {
      id: 'push',
      title: 'Notificaciones Push',
      description: 'Recibe notificaciones en tiempo real en tu navegador',
      enabled: false
    },
    {
      id: 'updates',
      title: 'Actualizaciones de Datos',
      description: 'Notificaciones cuando se actualicen los datos de países',
      enabled: true
    },
    {
      id: 'marketing',
      title: 'Comunicaciones de Marketing',
      description: 'Recibe noticias sobre nuevas funciones y actualizaciones',
      enabled: false
    }
  ]);
  
  activeSessions = signal([
    {
      id: '1',
      device: 'Chrome en Windows',
      location: 'Madrid, España',
      lastActive: 'Ahora',
      current: true
    },
    {
      id: '2',
      device: 'Safari en iPhone',
      location: 'Madrid, España',
      lastActive: 'Hace 2 horas',
      current: false
    },
    {
      id: '3',
      device: 'Firefox en Ubuntu',
      location: 'Barcelona, España',
      lastActive: 'Hace 1 día',
      current: false
    }
  ]);
  
  setActiveSection(section: string) {
    this.activeSection.set(section);
  }
  
  setTheme(theme: string) {
    this.selectedTheme.set(theme);
    // Aquí implementarías la lógica para cambiar el tema
  }
  
  toggleCurrentPassword() {
    this.showCurrentPassword.set(!this.showCurrentPassword());
  }
  
  toggleNewPassword() {
    this.showNewPassword.set(!this.showNewPassword());
  }
  
  toggleConfirmPassword() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }
}