import { Component, signal } from '@angular/core';
import {
  HlmCardDirective,
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
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
  lucideFlag,
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
    NgIcon,
  ],
  providers: [
    provideIcons({
      lucideGlobe,
      lucideUsers,
      lucideTrendingUp,
      lucideMapPin,
      lucideArrowUpRight,
      lucideArrowDownRight,
      lucideActivity,
      lucideCalendar,
      lucideFlag,
    }),
  ],
  templateUrl: './home.html',
})
export class Home {
  statsCards: StatCard[] = [
    {
      title: 'Total Países',
      value: '195',
      change: '+2.5%',
      changeType: 'increase',
      icon: 'lucideGlobe',
      color: 'bg-blue-500',
    },
    {
      title: 'Usuarios Activos',
      value: '1,234',
      change: '+12.3%',
      changeType: 'increase',
      icon: 'lucideUsers',
      color: 'bg-green-500',
    },
    {
      title: 'Visualizaciones',
      value: '45.2K',
      change: '+8.1%',
      changeType: 'increase',
      icon: 'lucideTrendingUp',
      color: 'bg-purple-500',
    },
    {
      title: 'Regiones',
      value: '6',
      change: '0%',
      changeType: 'increase',
      icon: 'lucideMapPin',
      color: 'bg-orange-500',
    },
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
    { name: 'Australia', flag: '🇦🇺', views: '4.3K', percentage: 34 },
  ];

  recentActivities: RecentActivity[] = [
    {
      id: '1',
      action: 'Visualizó información de',
      country: 'España',
      time: 'Hace 2 minutos',
      type: 'view',
    },
    {
      id: '2',
      action: 'Actualizó datos de',
      country: 'México',
      time: 'Hace 15 minutos',
      type: 'update',
    },
    {
      id: '3',
      action: 'Agregó nuevo país',
      country: 'Montenegro',
      time: 'Hace 1 hora',
      type: 'create',
    },
    {
      id: '4',
      action: 'Visualizó información de',
      country: 'Noruega',
      time: 'Hace 2 horas',
      type: 'view',
    },
    {
      id: '5',
      action: 'Actualizó datos de',
      country: 'Suecia',
      time: 'Hace 3 horas',
      type: 'update',
    },
  ];

  getActivityColor(type: string): string {
    switch (type) {
      case 'view':
        return 'bg-blue-500';
      case 'update':
        return 'bg-yellow-500';
      case 'create':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'view':
        return 'lucideActivity';
      case 'update':
        return 'lucideCalendar';
      case 'create':
        return 'lucideFlag';
      default:
        return 'lucideActivity';
    }
  }
}
