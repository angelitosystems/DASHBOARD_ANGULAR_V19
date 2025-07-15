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
  selector: 'angelitosystems-statistics',
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
  template: `
    <div class="space-y-8 p-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 animate-slide-up"
      >
        <div class="space-y-2">
          <h1 class="text-4xl font-bold text-primary">
            Estadísticas
          </h1>
          <p class="text-muted-foreground text-lg">
            Análisis detallado de datos y métricas
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <brn-select [(ngModel)]="selectedPeriod">
            <hlm-select-trigger class="w-44 h-12">
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              <hlm-option value="7d">Últimos 7 días</hlm-option>
              <hlm-option value="30d">Últimos 30 días</hlm-option>
              <hlm-option value="90d">Últimos 90 días</hlm-option>
              <hlm-option value="1y">Último año</hlm-option>
            </hlm-select-content>
          </brn-select>
          <button hlmBtn variant="outline" size="sm" class="btn-modern hover:scale-105 transition-all duration-200">
            <ng-icon hlm name="lucideRefreshCw" size="sm" class="mr-2" />
            Actualizar
          </button>
          <button hlmBtn variant="outline" size="sm" class="btn-modern hover:scale-105 transition-all duration-200">
            <ng-icon hlm name="lucideDownload" size="sm" class="mr-2" />
            Exportar
          </button>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style="animation-delay: 100ms">
        @for (stat of statsCards(); track stat.title; let i = $index) {
        <div class="card-modern group hover:scale-[1.02] transition-all duration-300" [style.animation-delay]="(i * 50) + 'ms'">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-4">
                <div [class]="'p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 ' + stat.color">
                  <ng-icon
                    hlm
                    [name]="stat.icon"
                    size="md"
                    class="text-white"
                  />
                </div>
                <div>
                  <p class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {{ stat.title }}
                  </p>
                  <p class="text-3xl font-bold text-foreground mt-1">
                    {{ stat.value }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex items-center pt-4 border-t border-border/50">
              <div class="flex items-center space-x-2">
                <ng-icon
                  hlm
                  [name]="
                    stat.trend === 'up'
                      ? 'lucideTrendingUp'
                      : 'lucideTrendingDown'
                  "
                  size="sm"
                  [class]="
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  "
                />
                <span
                  [class]="
                    'text-sm font-semibold ' +
                    (stat.trend === 'up' ? 'text-green-600' : 'text-red-600')
                  "
                >
                  {{ stat.change }}
                </span>
              </div>
              <span class="text-xs text-muted-foreground ml-2"
                >vs período anterior</span
              >
            </div>
          </div>
        </div>
        }
      </div>

      <!-- Charts Row 1 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style="animation-delay: 200ms">
        <!-- Population by Region Chart -->
        <div class="card-modern">
          <div class="p-6 border-b border-border/50">
            <div class="flex items-center space-x-3 mb-2">
              <div class="p-2 bg-primary/10 rounded-lg">
                <ng-icon hlm name="lucideChartPie" size="sm" class="text-primary" />
              </div>
              <h3 class="text-xl font-bold text-foreground">Población por Región</h3>
            </div>
            <p class="text-muted-foreground">
              Distribución de población mundial por continente
            </p>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              @for (region of populationByRegion(); track region.label) {
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div
                    [style.background-color]="region.color"
                    class="w-3 h-3 rounded-full"
                  ></div>
                  <span
                    class="text-sm font-medium text-gray-900 dark:text-white"
                    >{{ region.label }}</span
                  >
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-gray-900 dark:text-white">
                    {{ formatNumber(region.value) }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    {{ getPercentage(region.value) }}%
                  </div>
                </div>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  [style.background-color]="region.color"
                  [style.width.%]="getPercentage(region.value)"
                  class="h-2 rounded-full transition-all duration-300"
                ></div>
              </div>
              }
            </div>
          </div>
        </div>

        <!-- Countries by Area Chart -->
        <div class="card-modern">
          <div class="p-6 border-b border-border/50">
            <div class="flex items-center space-x-3 mb-2">
              <div class="p-2 bg-secondary/10 rounded-lg">
                <ng-icon hlm name="lucideChartBar" size="sm" class="text-secondary-foreground" />
              </div>
              <h3 class="text-xl font-bold text-foreground">Países por Área</h3>
            </div>
            <p class="text-muted-foreground">
              Los 10 países más grandes por superficie
            </p>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              @for (country of countriesByArea(); track country.label; let i =
              $index) {
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <span
                    class="text-sm font-bold text-gray-500 dark:text-gray-400 w-6"
                    >{{ i + 1 }}</span
                  >
                  <span
                    class="text-sm font-medium text-gray-900 dark:text-white"
                    >{{ country.label }}</span
                  >
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-gray-900 dark:text-white">
                    {{ formatNumber(country.value) }} km²
                  </div>
                </div>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  [style.background-color]="country.color"
                  [style.width.%]="(country.value / maxArea()) * 100"
                  class="h-2 rounded-full transition-all duration-300"
                ></div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style="animation-delay: 300ms">
        <!-- Language Distribution -->
        <div class="card-modern">
          <div class="p-6 border-b border-border/50">
            <div class="flex items-center space-x-3 mb-2">
              <div class="p-2 bg-blue-500/10 rounded-lg">
                <ng-icon hlm name="lucideGlobe" size="sm" class="text-blue-600" />
              </div>
              <h3 class="text-lg font-bold text-foreground">Idiomas</h3>
            </div>
            <p class="text-sm text-muted-foreground">Distribución de idiomas oficiales</p>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              @for (language of languageDistribution(); track language.label) {
              <div class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <span class="text-sm font-medium text-foreground">{{ language.label }}</span>
                <span hlmBadge variant="outline" class="font-semibold">{{ language.value }} países</span>
              </div>
              }
            </div>
          </div>
        </div>

        <!-- Currency Distribution -->
        <div class="card-modern">
          <div class="p-6 border-b border-border/50">
            <div class="flex items-center space-x-3 mb-2">
              <div class="p-2 bg-green-500/10 rounded-lg">
                <ng-icon hlm name="lucideActivity" size="sm" class="text-green-600" />
              </div>
              <h3 class="text-lg font-bold text-foreground">Monedas</h3>
            </div>
            <p class="text-sm text-muted-foreground">Monedas más utilizadas</p>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              @for (currency of currencyDistribution(); track currency.label) {
              <div class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <span class="text-sm font-medium text-foreground">{{ currency.label }}</span>
                <span hlmBadge [variant]="currency.value > 10 ? 'default' : 'secondary'" class="font-semibold">{{ currency.value }} países</span>
              </div>
              }
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card-modern">
          <div class="p-6 border-b border-border/50">
            <div class="flex items-center space-x-3 mb-2">
              <div class="p-2 bg-purple-500/10 rounded-lg">
                <ng-icon hlm name="lucideCalendar" size="sm" class="text-purple-600" />
              </div>
              <h3 class="text-lg font-bold text-foreground">Actividad Reciente</h3>
            </div>
            <p class="text-sm text-muted-foreground">Últimas actualizaciones</p>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              @for (activity of recentActivity(); track activity.id) {
              <div class="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <div class="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0 animate-pulse"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-foreground leading-relaxed">{{ activity.description }}</p>
                  <p class="text-xs text-muted-foreground mt-2 font-medium">{{ activity.time }}</p>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="card-modern animate-slide-up" style="animation-delay: 400ms">
        <div class="p-6 border-b border-border/50">
          <div class="flex items-center space-x-3 mb-2">
            <div class="p-2 bg-primary rounded-lg">
              <ng-icon hlm name="lucideActivity" size="sm" class="text-white" />
            </div>
            <h3 class="text-xl font-bold text-foreground">Resumen Global</h3>
          </div>
          <p class="text-muted-foreground">Estadísticas generales del sistema</p>
        </div>
        <div class="p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center group">
              <div class="p-4 bg-blue-500/10 rounded-xl mb-4 group-hover:bg-blue-500/20 transition-colors duration-200">
                <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  195
                </div>
              </div>
              <div class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Total Países
              </div>
            </div>
            <div class="text-center group">
              <div class="p-4 bg-green-500/10 rounded-xl mb-4 group-hover:bg-green-500/20 transition-colors duration-200">
                <div class="text-4xl font-bold text-green-600 dark:text-green-400">
                  7.9B
                </div>
              </div>
              <div class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Población Mundial
              </div>
            </div>
            <div class="text-center group">
              <div class="p-4 bg-purple-500/10 rounded-xl mb-4 group-hover:bg-purple-500/20 transition-colors duration-200">
                <div class="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  149M
                </div>
              </div>
              <div class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Área Total (km²)
              </div>
            </div>
            <div class="text-center group">
              <div class="p-4 bg-orange-500/10 rounded-xl mb-4 group-hover:bg-orange-500/20 transition-colors duration-200">
                <div class="text-4xl font-bold text-orange-600 dark:text-orange-400">
                  180
                </div>
              </div>
              <div class="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Monedas Diferentes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Statistics {
  selectedPeriod = '30d';

  statsCards = signal<StatCard[]>([
    {
      title: 'Total Países',
      value: '195',
      change: '+2.5%',
      trend: 'up',
      icon: 'lucideGlobe',
      color: 'bg-blue-500',
    },
    {
      title: 'Población Total',
      value: '7.9B',
      change: '+1.2%',
      trend: 'up',
      icon: 'lucideUsers',
      color: 'bg-green-500',
    },
    {
      title: 'Área Total',
      value: '149M km²',
      change: '0%',
      trend: 'up',
      icon: 'lucideBarChart3',
      color: 'bg-purple-500',
    },
    {
      title: 'Regiones',
      value: '6',
      change: '0%',
      trend: 'up',
      icon: 'lucidePieChart',
      color: 'bg-orange-500',
    },
  ]);

  populationByRegion = signal<ChartData[]>([
    { label: 'Asia', value: 4641054775, color: '#3B82F6' },
    { label: 'África', value: 1340598147, color: '#10B981' },
    { label: 'Europa', value: 747636026, color: '#8B5CF6' },
    { label: 'América del Norte', value: 579024000, color: '#F59E0B' },
    { label: 'América del Sur', value: 430759766, color: '#EF4444' },
    { label: 'Oceanía', value: 45376763, color: '#06B6D4' },
  ]);

  countriesByArea = signal<ChartData[]>([
    { label: 'Rusia', value: 17098242, color: '#3B82F6' },
    { label: 'Canadá', value: 9984670, color: '#10B981' },
    { label: 'Estados Unidos', value: 9833517, color: '#8B5CF6' },
    { label: 'China', value: 9596960, color: '#F59E0B' },
    { label: 'Brasil', value: 8514877, color: '#EF4444' },
    { label: 'Australia', value: 7741220, color: '#06B6D4' },
    { label: 'India', value: 3287263, color: '#84CC16' },
    { label: 'Argentina', value: 2780400, color: '#F97316' },
    { label: 'Kazajistán', value: 2724900, color: '#EC4899' },
    { label: 'Argelia', value: 2381741, color: '#6366F1' },
  ]);

  languageDistribution = signal<ChartData[]>([
    { label: 'Inglés', value: 67, color: '#3B82F6' },
    { label: 'Francés', value: 29, color: '#10B981' },
    { label: 'Español', value: 21, color: '#8B5CF6' },
    { label: 'Árabe', value: 25, color: '#F59E0B' },
    { label: 'Portugués', value: 9, color: '#EF4444' },
    { label: 'Otros', value: 44, color: '#6B7280' },
  ]);

  currencyDistribution = signal<ChartData[]>([
    { label: 'Euro (EUR)', value: 19, color: '#3B82F6' },
    { label: 'Dólar USD', value: 8, color: '#10B981' },
    { label: 'Franco CFA', value: 14, color: '#8B5CF6' },
    { label: 'Libra Esterlina', value: 4, color: '#F59E0B' },
    { label: 'Peso', value: 7, color: '#EF4444' },
  ]);

  recentActivity = signal([
    {
      id: '1',
      description: 'Actualización de datos de población para India',
      time: 'Hace 2 horas',
    },
    {
      id: '2',
      description: 'Nuevo país agregado: Montenegro',
      time: 'Hace 1 día',
    },
    {
      id: '3',
      description: 'Corrección de datos de área para Groenlandia',
      time: 'Hace 2 días',
    },
    {
      id: '4',
      description: 'Actualización de moneda para Turquía',
      time: 'Hace 3 días',
    },
    {
      id: '5',
      description: 'Revisión de datos de capital para Sudáfrica',
      time: 'Hace 1 semana',
    },
  ]);

  totalPopulation = computed(() =>
    this.populationByRegion().reduce((sum, region) => sum + region.value, 0)
  );

  maxArea = computed(() =>
    Math.max(...this.countriesByArea().map((country) => country.value))
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
    return Math.round((value / this.totalPopulation()) * 100);
  }
}
