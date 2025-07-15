import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmCardDirective, HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/helm/card';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import { HlmSelectImports, HlmSelectOptionComponent } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  lucideSearch, 
  lucideListFilter, 
  lucideDownload, 
  lucideEye,
  lucidePencil,
  lucideTrash2,
  lucideMenu,
  lucideChevronLeft,
  lucideChevronRight
} from '@ng-icons/lucide';

interface Country {
  id: string;
  name: string;
  capital: string;
  region: string;
  population: number;
  area: number;
  flag: string;
  code: string;
  currency: string;
  language: string;
}

@Component({
  selector: 'angelitosystems-countries',
  imports: [
    FormsModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmButtonDirective,
    HlmInputDirective,
    HlmIconDirective,
    HlmBadgeDirective,
    HlmTableImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmSelectOptionComponent,
    NgIcon
  ],
  providers: [provideIcons({ 
    lucideSearch, 
    lucideListFilter, 
    lucideDownload, 
    lucideEye,
    lucidePencil,
    lucideTrash2,
    lucideMenu ,
    lucideChevronLeft,
    lucideChevronRight
  })],
  template: `
    <div class="space-y-8 p-6 max-w-7xl mx-auto animate-fade-in">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 animate-slide-up">
        <div class="space-y-2">
          <h1 class="text-4xl font-bold text-primary">Países</h1>
          <p class="text-muted-foreground text-lg">Explora información detallada de {{ totalCountries() }} países</p>
        </div>
        <div class="flex items-center space-x-3">
          <button hlmBtn variant="outline" size="sm" class="btn-modern hover:scale-105 transition-all duration-200">
            <ng-icon hlm name="lucideDownload" size="sm" class="mr-2" />
            Exportar
          </button>
          <button hlmBtn size="sm" class="btn-modern hover:scale-105 transition-all duration-200">
            Agregar País
          </button>
        </div>
      </div>
      
      <!-- Filters and Search -->
      <div class="card-modern animate-slide-up" style="animation-delay: 100ms">
        <div class="p-8">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Search -->
            <div class="flex-1">
              <label class="block text-sm font-semibold text-foreground mb-3">Buscar País</label>
              <div class="relative">
                <ng-icon hlm name="lucideSearch" size="sm" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input 
                  hlmInput 
                  type="text" 
                  placeholder="Buscar países..."
                  [(ngModel)]="searchTerm"
                  (input)="onSearch()"
                  class="input-modern pl-12 pr-4 py-4 text-sm w-full"
                />
              </div>
            </div>
            
            <!-- Region Filter -->
            <div class="w-full lg:w-56">
              <label class="block text-sm font-semibold text-foreground mb-3">Región</label>
              <brn-select [(ngModel)]="selectedRegion" (ngModelChange)="onRegionChange()">
                <hlm-select-trigger class="h-12">
                  <hlm-select-value placeholder="Todas las regiones" />
                </hlm-select-trigger>
                <hlm-select-content>
                  <hlm-option value="all">Todas las regiones</hlm-option>
                  <hlm-option value="Africa">África</hlm-option>
                  <hlm-option value="Americas">América</hlm-option>
                  <hlm-option value="Asia">Asia</hlm-option>
                  <hlm-option value="Europe">Europa</hlm-option>
                  <hlm-option value="Oceania">Oceanía</hlm-option>
                </hlm-select-content>
              </brn-select>
            </div>
            
            <!-- Population Filter -->
            <div class="w-full lg:w-56">
              <label class="block text-sm font-semibold text-foreground mb-3">Población</label>
              <brn-select [(ngModel)]="selectedPopulation" (ngModelChange)="onPopulationChange()">
                <hlm-select-trigger class="h-12">
                  <hlm-select-value placeholder="Población" />
                </hlm-select-trigger>
                <hlm-select-content>
                  <hlm-option value="all">Todas</hlm-option>
                  <hlm-option value="small">< 1M</hlm-option>
                  <hlm-option value="medium">1M - 50M</hlm-option>
                  <hlm-option value="large">50M - 100M</hlm-option>
                  <hlm-option value="xlarge">> 100M</hlm-option>
                </hlm-select-content>
              </brn-select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Results Summary -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 animate-slide-up" style="animation-delay: 200ms">
        <div class="flex items-center space-x-3">
          <div class="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
          <p class="text-sm font-medium text-muted-foreground">
            Mostrando <span class="font-bold text-foreground">{{ paginatedCountries().length }}</span> de <span class="font-bold text-foreground">{{ filteredCountries().length }}</span> países
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <span class="text-sm font-medium text-muted-foreground">Filas por página:</span>
          <brn-select [(ngModel)]="pageSize" (ngModelChange)="onPageSizeChange()">
            <hlm-select-trigger class="w-24 h-10">
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              <hlm-option value="10">10</hlm-option>
              <hlm-option value="25">25</hlm-option>
              <hlm-option value="50">50</hlm-option>
              <hlm-option value="100">100</hlm-option>
            </hlm-select-content>
          </brn-select>
        </div>
      </div>
      
      <!-- Countries Table -->
      <div class="card-modern animate-slide-up" style="animation-delay: 300ms">
        <div class="overflow-hidden">
          <div class="overflow-x-auto">
            <table hlmTable class="w-full">
              <thead hlmTHead class="bg-muted/30">
                <tr hlmTr>
                  <th hlmTh class="w-12 py-4 px-6"></th>
                  <th hlmTh class="py-4 px-6 font-semibold text-foreground">País</th>
                  <th hlmTh class="py-4 px-6 font-semibold text-foreground">Capital</th>
                  <th hlmTh class="py-4 px-6 font-semibold text-foreground">Región</th>
                  <th hlmTh class="text-right py-4 px-6 font-semibold text-foreground">Población</th>
                  <th hlmTh class="text-right py-4 px-6 font-semibold text-foreground">Área (km²)</th>
                  <th hlmTh class="py-4 px-6 font-semibold text-foreground">Moneda</th>
                  <th hlmTh class="w-20 py-4 px-6 font-semibold text-foreground">Acciones</th>
                </tr>
              </thead>
              
              <tbody hlmTBody>
                @for (country of paginatedCountries(); track country.id) {
                  <tr hlmTr class="group hover:bg-muted/50 transition-all duration-200 border-b border-border/50">
                    <td hlmTd class="py-4 px-6">
                      <div class="relative">
                        <span class="text-3xl group-hover:scale-110 transition-transform duration-200">{{ country.flag }}</span>
                      </div>
                    </td>
                    <td hlmTd class="py-4 px-6">
                      <div class="flex flex-col">
                        <span class="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{{ country.name }}</span>
                        <span class="text-sm text-muted-foreground mt-1">{{ country.code }}</span>
                      </div>
                    </td>
                    <td hlmTd class="py-4 px-6">
                      <span class="font-medium text-foreground">{{ country.capital }}</span>
                    </td>
                    <td hlmTd class="py-4 px-6">
                      <span hlmBadge [variant]="getRegionVariant(country.region)" class="px-3 py-1 rounded-full text-xs font-medium">{{ country.region }}</span>
                    </td>
                    <td hlmTd class="text-right py-4 px-6">
                      <span class="font-mono text-sm text-foreground">{{ formatNumber(country.population) }}</span>
                    </td>
                    <td hlmTd class="text-right py-4 px-6">
                      <span class="font-mono text-sm text-foreground">{{ formatNumber(country.area) }}</span>
                    </td>
                    <td hlmTd class="py-4 px-6">
                      <span class="font-medium text-foreground">{{ country.currency }}</span>
                    </td>
                    <td hlmTd class="py-4 px-6">
                      <div class="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button hlmBtn variant="ghost" size="sm" class="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                          <ng-icon hlm name="lucideEye" size="sm" />
                        </button>
                        <button hlmBtn variant="ghost" size="sm" class="h-8 w-8 p-0 hover:bg-secondary hover:text-secondary-foreground transition-all duration-200">
                          <ng-icon hlm name="lucidePencil" size="sm" />
                        </button>
                        <button hlmBtn variant="ghost" size="sm" class="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 transition-all duration-200">
                          <ng-icon hlm name="lucideTrash2" size="sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr hlmTr>
                    <td hlmTd colspan="8" class="text-center py-8">
                      <div class="flex flex-col items-center space-y-2">
                        <ng-icon hlm name="lucideSearch" size="lg" class="text-gray-400" />
                        <p class="text-gray-500 dark:text-gray-400">No se encontraron países</p>
                        <p class="text-sm text-gray-400 dark:text-gray-500">Intenta ajustar los filtros de búsqueda</p>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 animate-slide-up" style="animation-delay: 400ms">
        <div class="flex items-center space-x-2">
          <div class="h-2 w-2 rounded-full bg-secondary animate-pulse"></div>
          <p class="text-sm font-medium text-muted-foreground">
            Página <span class="font-bold text-foreground">{{ currentPage() }}</span> de <span class="font-bold text-foreground">{{ totalPages() }}</span>
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <button 
            hlmBtn 
            variant="outline" 
            size="sm" 
            [disabled]="currentPage() === 1"
            (click)="previousPage()"
            class="btn-modern hover:scale-105 transition-all duration-200 disabled:hover:scale-100"
          >
            <ng-icon hlm name="lucideChevronLeft" size="sm" class="mr-1" />
            Anterior
          </button>
          <button 
            hlmBtn 
            variant="outline" 
            size="sm" 
            [disabled]="currentPage() === totalPages()"
            (click)="nextPage()"
            class="btn-modern hover:scale-105 transition-all duration-200 disabled:hover:scale-100"
          >
            Siguiente
            <ng-icon hlm name="lucideChevronRight" size="sm" class="ml-1" />
          </button>
        </div>
      </div>
    </div>
  `
})
export class Countries {
  searchTerm = '';
  selectedRegion = 'all';
  selectedPopulation = 'all';
  pageSize = 25;
  currentPageIndex = signal(0);
  
  // Mock data - en una aplicación real vendría de un servicio
  allCountries: Country[] = [
    {
      id: '1',
      name: 'España',
      capital: 'Madrid',
      region: 'Europe',
      population: 47351567,
      area: 505990,
      flag: '🇪🇸',
      code: 'ES',
      currency: 'EUR',
      language: 'Spanish'
    },
    {
      id: '2',
      name: 'Francia',
      capital: 'París',
      region: 'Europe',
      population: 67391582,
      area: 643801,
      flag: '🇫🇷',
      code: 'FR',
      currency: 'EUR',
      language: 'French'
    },
    {
      id: '3',
      name: 'Estados Unidos',
      capital: 'Washington D.C.',
      region: 'Americas',
      population: 331900000,
      area: 9833517,
      flag: '🇺🇸',
      code: 'US',
      currency: 'USD',
      language: 'English'
    },
    {
      id: '4',
      name: 'Japón',
      capital: 'Tokio',
      region: 'Asia',
      population: 125800000,
      area: 377975,
      flag: '🇯🇵',
      code: 'JP',
      currency: 'JPY',
      language: 'Japanese'
    },
    {
      id: '5',
      name: 'Brasil',
      capital: 'Brasília',
      region: 'Americas',
      population: 215300000,
      area: 8515767,
      flag: '🇧🇷',
      code: 'BR',
      currency: 'BRL',
      language: 'Portuguese'
    },
    {
      id: '6',
      name: 'Australia',
      capital: 'Canberra',
      region: 'Oceania',
      population: 25690000,
      area: 7692024,
      flag: '🇦🇺',
      code: 'AU',
      currency: 'AUD',
      language: 'English'
    },
    {
      id: '7',
      name: 'Nigeria',
      capital: 'Abuja',
      region: 'Africa',
      population: 218500000,
      area: 923768,
      flag: '🇳🇬',
      code: 'NG',
      currency: 'NGN',
      language: 'English'
    },
    {
      id: '8',
      name: 'India',
      capital: 'Nueva Delhi',
      region: 'Asia',
      population: 1380000000,
      area: 3287263,
      flag: '🇮🇳',
      code: 'IN',
      currency: 'INR',
      language: 'Hindi'
    }
  ];
  
  filteredCountries = computed(() => {
    let filtered = this.allCountries;
    
    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(country => 
        country.name.toLowerCase().includes(term) ||
        country.capital.toLowerCase().includes(term) ||
        country.code.toLowerCase().includes(term)
      );
    }
    
    // Filter by region
    if (this.selectedRegion !== 'all') {
      filtered = filtered.filter(country => country.region === this.selectedRegion);
    }
    
    // Filter by population
    if (this.selectedPopulation !== 'all') {
      filtered = filtered.filter(country => {
        switch (this.selectedPopulation) {
          case 'small': return country.population < 1000000;
          case 'medium': return country.population >= 1000000 && country.population < 50000000;
          case 'large': return country.population >= 50000000 && country.population < 100000000;
          case 'xlarge': return country.population >= 100000000;
          default: return true;
        }
      });
    }
    
    return filtered;
  });
  
  totalCountries = computed(() => this.allCountries.length);
  totalPages = computed(() => Math.ceil(this.filteredCountries().length / this.pageSize));
  currentPage = computed(() => this.currentPageIndex() + 1);
  
  paginatedCountries = computed(() => {
    const start = this.currentPageIndex() * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredCountries().slice(start, end);
  });
  
  onSearch() {
    this.currentPageIndex.set(0);
  }
  
  onRegionChange() {
    this.currentPageIndex.set(0);
  }
  
  onPopulationChange() {
    this.currentPageIndex.set(0);
  }
  
  onPageSizeChange() {
    this.currentPageIndex.set(0);
  }
  
  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPageIndex.set(this.currentPageIndex() - 1);
    }
  }
  
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPageIndex.set(this.currentPageIndex() + 1);
    }
  }
  
  formatNumber(num: number): string {
    return new Intl.NumberFormat('es-ES').format(num);
  }
  
  getRegionVariant(region: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (region) {
      case 'Europe': return 'default';
      case 'Americas': return 'secondary';
      case 'Asia': return 'outline';
      case 'Africa': return 'destructive';
      case 'Oceania': return 'secondary';
      default: return 'outline';
    }
  }
}