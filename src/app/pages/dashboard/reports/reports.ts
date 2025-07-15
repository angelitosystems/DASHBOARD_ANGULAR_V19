import { Component, signal, computed } from '@angular/core';
import {
  HlmCardDirective,
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import {
  HlmSelectImports,
  HlmSelectOptionComponent,
} from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideTrendingUp,
  lucideTrendingDown,
  lucideUsers,
  lucideGlobe,
  lucideChartBar,
  lucideChartPie,
  lucideActivity,
  lucideCalendar,
  lucideDownload,
  lucideRefreshCw,
} from '@ng-icons/lucide';
import { FormsModule } from '@angular/forms';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

@Component({
  selector: 'angelitosystems-reports',
  imports: [
    FormsModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    HlmBadgeDirective,
    BrnSelectImports,
    HlmSelectImports,
    HlmSelectOptionComponent,
    NgIcon,
  ],
  providers: [
    provideIcons({
      lucideTrendingUp,
      lucideTrendingDown,
      lucideUsers,
      lucideGlobe,
      lucideChartBar,
      lucideChartPie,
      lucideActivity,
      lucideCalendar,
      lucideDownload,
      lucideRefreshCw,
    }),
  ],
  templateUrl: './reports.html',
})
export class Reports {
  selectedPeriod = '30d';

  statsCards = signal<StatCard[]>([
    {
      title: 'Total Usuarios',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: 'lucideUsers',
      color: 'bg-blue-500',
    },
    {
      title: 'Usuarios Activos',
      value: '1,089',
      change: '+8.2%',
      trend: 'up',
      icon: 'lucideActivity',
      color: 'bg-green-500',
    },
    {
      title: 'Nuevos Registros',
      value: '156',
      change: '+24.1%',
      trend: 'up',
      icon: 'lucideTrendingUp',
      color: 'bg-purple-500',
    },
    {
      title: 'Departamentos',
      value: '8',
      change: '+1',
      trend: 'up',
      icon: 'lucideChartBar',
      color: 'bg-orange-500',
    },
  ]);

  usersByDepartment = signal<ChartData[]>([
    { label: 'IT', value: 245, color: '#3B82F6' },
    { label: 'Ventas', value: 189, color: '#10B981' },
    { label: 'Marketing', value: 156, color: '#8B5CF6' },
    { label: 'RRHH', value: 134, color: '#F59E0B' },
    { label: 'Finanzas', value: 98, color: '#EF4444' },
    { label: 'Operaciones', value: 87, color: '#06B6D4' },
    { label: 'Soporte', value: 76, color: '#84CC16' },
    { label: 'Consultoría', value: 45, color: '#F97316' },
  ]);

  topProjects = signal<ChartData[]>([
    { label: 'Sistema CRM', value: 1247, color: '#3B82F6' },
    { label: 'App Móvil', value: 986, color: '#10B981' },
    { label: 'Portal Web', value: 834, color: '#8B5CF6' },
    { label: 'API Gateway', value: 756, color: '#F59E0B' },
    { label: 'Dashboard Analytics', value: 689, color: '#EF4444' },
    { label: 'Sistema Inventario', value: 567, color: '#06B6D4' },
    { label: 'Plataforma E-learning', value: 445, color: '#84CC16' },
    { label: 'App Finanzas', value: 378, color: '#F97316' },
    { label: 'Sistema RRHH', value: 289, color: '#EC4899' },
    { label: 'Portal Clientes', value: 234, color: '#6366F1' },
  ]);

  skillsDistribution = signal<ChartData[]>([
    { label: 'JavaScript', value: 287, color: '#3B82F6' },
    { label: 'Python', value: 234, color: '#10B981' },
    { label: 'Java', value: 189, color: '#8B5CF6' },
    { label: 'C#', value: 156, color: '#F59E0B' },
    { label: 'React', value: 134, color: '#EF4444' },
    { label: 'Angular', value: 98, color: '#6B7280' },
  ]);

  performanceDistribution = signal<ChartData[]>([
    { label: 'Excelente', value: 89, color: '#3B82F6' },
    { label: 'Muy Bueno', value: 156, color: '#10B981' },
    { label: 'Bueno', value: 234, color: '#8B5CF6' },
    { label: 'Regular', value: 67, color: '#F59E0B' },
    { label: 'Necesita Mejora', value: 23, color: '#EF4444' },
  ]);

  recentActivity = signal([
    {
      id: '1',
      description: 'Nuevo usuario registrado en el sistema',
      time: 'Hace 2 horas',
    },
    {
      id: '2',
      description: 'Actualización de permisos de usuario',
      time: 'Hace 1 día',
    },
    {
      id: '3',
      description: 'Migración de datos completada',
      time: 'Hace 2 días',
    },
    {
      id: '4',
      description: 'Configuración de departamento actualizada',
      time: 'Hace 3 días',
    },
    {
      id: '5',
      description: 'Backup automático ejecutado',
      time: 'Hace 1 semana',
    },
  ]);

  totalUsers = computed(() =>
    this.usersByDepartment().reduce((sum, department) => sum + department.value, 0)
  );

  maxTasks = computed(() =>
    Math.max(...this.topProjects().map((project) => project.value))
  );

  formatNumber(num: number): string {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString('es-ES');
  }

  getPercentage(value: number): number {
    return Math.round((value / this.totalUsers()) * 100);
  }
}
