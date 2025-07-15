import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'dashboard-theme';
  
  // Signal para el tema actual
  theme = signal<Theme>(this.getInitialTheme());
  
  // Signal para saber si estamos en modo oscuro
  isDarkMode = signal(false);
  
  constructor() {
    // Effect para aplicar el tema cuando cambie
    effect(() => {
      this.applyTheme(this.theme());
    });
    
    // Escuchar cambios en las preferencias del sistema
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.theme() === 'system') {
          this.updateDarkMode();
        }
      });
    }
    
    // Inicializar el estado del modo oscuro
    this.updateDarkMode();
  }
  
  /**
   * Cambia el tema de la aplicación
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }
  
  /**
   * Alterna entre modo claro y oscuro
   */
  toggleTheme(): void {
    const currentTheme = this.theme();
    if (currentTheme === 'system') {
      // Si está en sistema, cambiar a claro u oscuro según la preferencia actual
      const prefersDark = this.getSystemPreference();
      this.setTheme(prefersDark ? 'light' : 'dark');
    } else {
      // Alternar entre claro y oscuro
      this.setTheme(currentTheme === 'light' ? 'dark' : 'light');
    }
  }
  
  /**
   * Obtiene el tema inicial desde localStorage o usa 'system' por defecto
   */
  private getInitialTheme(): Theme {
    if (typeof window === 'undefined') {
      return 'system';
    }
    
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    return savedTheme || 'system';
  }
  
  /**
   * Aplica el tema al documento
   */
  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') {
      return;
    }
    
    const root = document.documentElement;
    
    // Remover clases de tema existentes
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      effectiveTheme = this.getSystemPreference() ? 'dark' : 'light';
    } else {
      effectiveTheme = theme;
    }
    
    // Aplicar la clase del tema
    root.classList.add(effectiveTheme);
    
    // Actualizar el signal de modo oscuro
    this.isDarkMode.set(effectiveTheme === 'dark');
  }
  
  /**
   * Obtiene la preferencia del sistema
   */
  private getSystemPreference(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  /**
   * Actualiza el estado del modo oscuro
   */
  private updateDarkMode(): void {
    const theme = this.theme();
    let isDark: boolean;
    
    if (theme === 'system') {
      isDark = this.getSystemPreference();
    } else {
      isDark = theme === 'dark';
    }
    
    this.isDarkMode.set(isDark);
  }
  
  /**
   * Obtiene el nombre del tema para mostrar en la UI
   */
  getThemeDisplayName(theme: Theme): string {
    switch (theme) {
      case 'light':
        return 'Claro';
      case 'dark':
        return 'Oscuro';
      case 'system':
        return 'Sistema';
      default:
        return 'Sistema';
    }
  }
  
  /**
   * Obtiene el icono del tema
   */
  getThemeIcon(theme: Theme): string {
    switch (theme) {
      case 'light':
        return 'lucideSun';
      case 'dark':
        return 'lucideMoon';
      case 'system':
        return 'lucideMonitor';
      default:
        return 'lucideMonitor';
    }
  }
}