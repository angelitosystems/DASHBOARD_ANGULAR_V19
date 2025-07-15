import { Component, signal } from '@angular/core';
import { HlmCardDirective, HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/helm/card';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmProgressDirective } from '@spartan-ng/helm/progress';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  lucideGlobe, 
  lucideUsers, 
  lucideTrendingUp, 
  lucideMapPin,
  lucideArrowUpRight,
  lucideArrowDownRight,
  lucideActivity,
  lucideCalendar,
  lucideFlag
} from '@ng-icons/lucide';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

interface RecentActivity {
  id: string;
  action: string;
  country: string;
  time: string;
  type: 'view' | 'update' | 'create';
}

@Component({
  selector: 'angelitosystems-home',
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmBadgeDirective,
    HlmButtonDirective,
    HlmIconDirective,
    HlmProgressDirective,
    NgIcon
  ],
  providers: [provideIcons({ 
    lucideGlobe, 
    lucideUsers, 
    lucideTrendingUp, 
    lucideMapPin,
    lucideArrowUpRight,
    lucideArrowDownRight,
    lucideActivity,
    lucideCalendar,
    lucideFlag
  })],
  template: `
    <div class="container-modern space-y-8 animate-fade-in">
      <!-- Welcome Section -->
      <div class="mb-10 animate-slide-up">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl lg:text-6xl font-bold text-primary mb-4">¡Bienvenido de vuelta!</h1>
          <p class="text-muted-foreground text-xl max-w-2xl mx-auto lg:mx-0">Aquí tienes un resumen de la actividad de países hoy.</p>
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (stat of statsCards; track stat.title; let i = $index) {
          <div class="card-modern group hover:scale-[1.02] transition-all duration-300 animate-slide-up p-8" [style.animation-delay]="i * 100 + 'ms'">
            <div class="flex flex-row items-center justify-between space-y-0 pb-4">
              <h3 class="text-sm font-bold text-muted-foreground uppercase tracking-wider">{{ stat.title }}</h3>
              <div class="h-14 w-14 rounded-2xl flex items-center justify-center bg-gradient-to-br transition-transform group-hover:scale-110 shadow-modern-lg" [class]="stat.color">
                <ng-icon hlm [name]="stat.icon" size="lg" class="text-white" />
              </div>
            </div>
            <div class="space-y-3">
              <div class="text-4xl font-bold text-foreground">{{ stat.value }}</div>
              <div class="flex items-center text-sm">
                <div class="flex items-center px-3 py-2 rounded-full" [class]="stat.changeType === 'increase' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'">
                  <ng-icon 
                    hlm 
                    [name]="stat.changeType === 'increase' ? 'lucideArrowUpRight' : 'lucideArrowDownRight'" 
                    size="sm" 
                    [class]="stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                  />
                  <span 
                    [class]="stat.changeType === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                    class="ml-2 font-bold"
                  >
                    {{ stat.change }}
                  </span>
                </div>
                <span class="text-muted-foreground ml-3 font-medium">desde ayer</span>
              </div>
            </div>
          </div>
        }
      </div>
      
      <!-- Charts and Activity Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Popular Countries Chart -->
        <div class="card-modern lg:col-span-2 animate-slide-up p-8" style="animation-delay: 400ms">
          <div class="space-y-2 mb-8">
            <h3 class="text-2xl font-bold text-foreground flex items-center">
              <div class="h-10 w-10 rounded-xl bg-primary flex items-center justify-center mr-4 shadow-modern-lg">
                <ng-icon hlm name="lucideTrendingUp" size="lg" class="text-white" />
              </div>
              Países Más Visitados
            </h3>
            <p class="text-muted-foreground text-lg">Top 10 países con más visualizaciones esta semana</p>
          </div>
          <div class="space-y-5">
            @for (country of popularCountries; track country.name; let i = $index) {
              <div class="flex items-center justify-between p-5 rounded-2xl hover:bg-muted/50 transition-all duration-200 group border border-border/50" [style.animation-delay]="(i * 50) + 'ms'">
                <div class="flex items-center space-x-5">
                  <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-base">
                    {{ i + 1 }}
                  </div>
                  <div class="flex items-center space-x-4">
                    <span class="text-4xl transition-transform group-hover:scale-110">{{ country.flag }}</span>
                    <span class="font-bold text-foreground text-lg">{{ country.name }}</span>
                  </div>
                </div>
                <div class="flex items-center space-x-5">
                  <div class="w-36 bg-muted rounded-full h-4 overflow-hidden">
                    <div 
                      class="bg-gradient-to-r from-primary to-primary/80 h-4 rounded-full transition-all duration-500 ease-out" 
                      [style.width.%]="country.percentage"
                    ></div>
                  </div>
                  <span class="text-base font-bold text-foreground w-20 text-right">{{ country.views }}</span>
                </div>
              </div>
            }
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="card-modern animate-slide-up p-8" style="animation-delay: 500ms">
          <div class="space-y-2 mb-8">
            <h3 class="text-2xl font-bold text-foreground flex items-center">
              <div class="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center mr-4 shadow-modern-lg">
                <ng-icon hlm name="lucideActivity" size="lg" class="text-white" />
              </div>
              Actividad Reciente
            </h3>
            <p class="text-muted-foreground text-lg">Últimas acciones realizadas</p>
          </div>
          <div class="space-y-5">
            @for (activity of recentActivities; track activity.id; let i = $index) {
              <div class="flex items-start space-x-5 p-4 rounded-2xl hover:bg-muted/50 transition-all duration-200 group border border-border/50" [style.animation-delay]="(i * 100) + 'ms'">
                <div class="flex-shrink-0">
                  <div 
                    class="h-12 w-12 rounded-xl flex items-center justify-center shadow-modern-lg transition-transform group-hover:scale-110"
                    [class]="getActivityColor(activity.type)"
                  >
                    <ng-icon hlm [name]="getActivityIcon(activity.type)" size="lg" class="text-white" />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-base text-foreground font-semibold">
                    {{ activity.action }} <span class="font-bold text-primary">{{ activity.country }}</span>
                  </p>
                  <p class="text-sm text-muted-foreground mt-2">{{ activity.time }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="card-modern animate-slide-up p-8" style="animation-delay: 600ms">
        <div class="space-y-2 mb-8">
          <h3 class="text-2xl font-bold text-foreground">Acciones Rápidas</h3>
          <p class="text-muted-foreground text-lg">Tareas comunes que puedes realizar</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <button class="btn-modern group h-auto p-8 flex flex-col items-center space-y-6 hover:scale-[1.02] transition-all duration-300 border border-border/50">
            <div class="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center shadow-modern-xl transition-transform group-hover:scale-110">
              <ng-icon hlm name="lucideFlag" size="xl" class="text-white" />
            </div>
            <div class="text-center">
              <span class="font-bold text-foreground text-xl">Explorar Países</span>
              <p class="text-base text-muted-foreground mt-2">Navega por la base de datos completa</p>
            </div>
          </button>
          
          <button class="btn-modern group h-auto p-8 flex flex-col items-center space-y-6 hover:scale-[1.02] transition-all duration-300 border border-border/50">
            <div class="h-20 w-20 rounded-3xl bg-green-500 flex items-center justify-center shadow-modern-xl transition-transform group-hover:scale-110">
              <ng-icon hlm name="lucideMapPin" size="xl" class="text-white" />
            </div>
            <div class="text-center">
              <span class="font-bold text-foreground text-xl">Ver Regiones</span>
              <p class="text-base text-muted-foreground mt-2">Explora países por región</p>
            </div>
          </button>
          
          <button class="btn-modern group h-auto p-8 flex flex-col items-center space-y-6 hover:scale-[1.02] transition-all duration-300 border border-border/50">
            <div class="h-20 w-20 rounded-3xl bg-purple-500 flex items-center justify-center shadow-modern-xl transition-transform group-hover:scale-110">
              <ng-icon hlm name="lucideTrendingUp" size="xl" class="text-white" />
            </div>
            <div class="text-center">
              <span class="font-bold text-foreground text-xl">Ver Estadísticas</span>
              <p class="text-base text-muted-foreground mt-2">Analiza datos y tendencias</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  `
})
export class Home {
  statsCards: StatCard[] = [
    {
      title: 'Total Países',
      value: '195',
      change: '+2.5%',
      changeType: 'increase',
      icon: 'lucideGlobe',
      color: 'bg-blue-500'
    },
    {
      title: 'Usuarios Activos',
      value: '1,234',
      change: '+12.3%',
      changeType: 'increase',
      icon: 'lucideUsers',
      color: 'bg-green-500'
    },
    {
      title: 'Visualizaciones',
      value: '45.2K',
      change: '+8.1%',
      changeType: 'increase',
      icon: 'lucideTrendingUp',
      color: 'bg-purple-500'
    },
    {
      title: 'Regiones',
      value: '6',
      change: '0%',
      changeType: 'increase',
      icon: 'lucideMapPin',
      color: 'bg-orange-500'
    }
  ];

  popularCountries = [
    { name: 'Estados Unidos', flag: '🇺🇸', views: '12.5K', percentage: 100 },
    { name: 'China', flag: '🇨🇳', views: '10.2K', percentage: 82 },
    { name: 'Japón', flag: '🇯🇵', views: '8.7K', percentage: 70 },
    { name: 'Alemania', flag: '🇩🇪', views: '7.3K', percentage: 58 },
    { name: 'Reino Unido', flag: '🇬🇧', views: '6.8K', percentage: 54 },
    { name: 'Francia', flag: '🇫🇷', views: '6.1K', percentage: 49 },
    { name: 'India', flag: '🇮🇳', views: '5.9K', percentage: 47 },
    { name: 'Brasil', flag: '🇧🇷', views: '5.2K', percentage: 42 },
    { name: 'Canadá', flag: '🇨🇦', views: '4.8K', percentage: 38 },
    { name: 'Australia', flag: '🇦🇺', views: '4.3K', percentage: 34 }
  ];

  recentActivities: RecentActivity[] = [
    {
      id: '1',
      action: 'Visualizó información de',
      country: 'España',
      time: 'Hace 2 minutos',
      type: 'view'
    },
    {
      id: '2',
      action: 'Actualizó datos de',
      country: 'México',
      time: 'Hace 15 minutos',
      type: 'update'
    },
    {
      id: '3',
      action: 'Agregó nuevo país',
      country: 'Montenegro',
      time: 'Hace 1 hora',
      type: 'create'
    },
    {
      id: '4',
      action: 'Visualizó información de',
      country: 'Noruega',
      time: 'Hace 2 horas',
      type: 'view'
    },
    {
      id: '5',
      action: 'Actualizó datos de',
      country: 'Suecia',
      time: 'Hace 3 horas',
      type: 'update'
    }
  ];

  getActivityColor(type: string): string {
    switch (type) {
      case 'view': return 'bg-blue-500';
      case 'update': return 'bg-yellow-500';
      case 'create': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'view': return 'lucideActivity';
      case 'update': return 'lucideCalendar';
      case 'create': return 'lucideFlag';
      default: return 'lucideActivity';
    }
  }
}