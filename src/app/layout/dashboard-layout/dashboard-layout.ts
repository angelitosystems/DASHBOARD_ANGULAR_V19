import { Component, signal, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmSeparatorDirective } from '@spartan-ng/helm/separator';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/helm/avatar';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import {
  HlmMenuComponent,
  HlmMenuItemDirective,
  HlmMenuSeparatorComponent,
  HlmMenuLabelComponent,
} from '../../components/ui/ui-menu-helm/src';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMenu,
  lucideX,
  lucideHouse,
  lucideChartBar,
  lucideUsers,
  lucideSettings,
  lucideBell,
  lucideSearch,
  lucideSun,
  lucideMoon,
  lucideGlobe,
  lucideFlag,
  lucideMap,
  lucideUser,
  lucideLogOut,
  lucideChevronDown,
} from '@ng-icons/lucide';
import { NgClass } from '@angular/common';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: string;
}

@Component({
  selector: 'angelitosystems-dashboard-layout',
  imports: [
    RouterOutlet,
    AsyncPipe,
    HlmButtonDirective,
    HlmIconDirective,
    HlmSeparatorDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmAvatarImageDirective,
    HlmBadgeDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuSeparatorComponent,
    HlmMenuLabelComponent,
    NgIcon,
    NgClass,
  ],
  providers: [
    provideIcons({
      lucideMenu,
      lucideX,
      lucideHouse,
      lucideChartBar,
      lucideUsers,
      lucideSettings,
      lucideBell,
      lucideSearch,
      lucideSun,
      lucideMoon,
      lucideGlobe,
      lucideFlag,
      lucideMap,
      lucideUser,
      lucideLogOut,
      lucideChevronDown,
    }),
  ],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);

  sidebarCollapsed = signal(false);
  isDarkMode = this.themeService.isDarkMode;
  currentPageTitle = signal('Inicio');
  userMenuOpen = signal(false);
  currentUser$ = this.authService.currentUser$;

  menuItems: MenuItem[] = [
    { icon: 'lucideHouse', label: 'Dashboard', route: '/dashboard' },
    {
      icon: 'lucideUsers',
      label: 'Usuarios',
      route: '/dashboard/users',
      badge: 'New',
    },
    {
      icon: 'lucideChartBar',
      label: 'Reportes',
      route: '/dashboard/reports',
    },
    {
      icon: 'lucideSettings',
      label: 'Configuración',
      route: '/dashboard/settings',
    },
  ];

  toggleSidebar() {
    this.sidebarCollapsed.set(!this.sidebarCollapsed());
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.updatePageTitle(route);
  }

  private updatePageTitle(route: string) {
    const item = this.menuItems.find((item) => item.route === route);
    if (item) {
      this.currentPageTitle.set(item.label);
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  toggleUserMenu() {
    this.userMenuOpen.set(!this.userMenuOpen());
  }

  closeUserMenu() {
    this.userMenuOpen.set(false);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Error durante logout:', error);
        // Incluso si hay error, limpiar datos locales y redirigir
        this.router.navigate(['/auth/login']);
      }
    });
  }

  goToProfile() {
    // Navegar al perfil del usuario
    this.router.navigate(['/dashboard/profile']);
  }
}
