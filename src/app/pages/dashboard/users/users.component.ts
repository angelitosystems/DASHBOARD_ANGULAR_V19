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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  phone: string;
}

@Component({
  selector: 'angelitosystems-users',
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
  templateUrl: './users.html',
})
export class Users {
  searchTerm = '';
  selectedRole = 'all';
  selectedStatus = 'all';
  pageSize = 25;
  currentPageIndex = signal(0);
  
  // Mock data - en una aplicación real vendría de un servicio
  allUsers: User[] = [
    {
      id: '1',
      name: 'Ana García',
      email: 'ana.garcia@empresa.com',
      role: 'admin',
      status: 'active',
      department: 'IT',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-15 09:30',
      phone: '+34 600 123 456'
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@empresa.com',
      role: 'manager',
      status: 'active',
      department: 'Ventas',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      joinDate: '2023-03-20',
      lastLogin: '2024-01-14 16:45',
      phone: '+34 600 234 567'
    },
    {
      id: '3',
      name: 'María López',
      email: 'maria.lopez@empresa.com',
      role: 'employee',
      status: 'active',
      department: 'Marketing',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      joinDate: '2023-06-10',
      lastLogin: '2024-01-15 08:15',
      phone: '+34 600 345 678'
    },
    {
      id: '4',
      name: 'David Martín',
      email: 'david.martin@empresa.com',
      role: 'employee',
      status: 'inactive',
      department: 'IT',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      joinDate: '2023-02-28',
      lastLogin: '2024-01-10 14:20',
      phone: '+34 600 456 789'
    },
    {
      id: '5',
      name: 'Laura Sánchez',
      email: 'laura.sanchez@empresa.com',
      role: 'manager',
      status: 'active',
      department: 'RRHH',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      joinDate: '2022-11-15',
      lastLogin: '2024-01-15 10:00',
      phone: '+34 600 567 890'
    },
    {
      id: '6',
      name: 'Pedro González',
      email: 'pedro.gonzalez@empresa.com',
      role: 'guest',
      status: 'pending',
      department: 'Consultoría',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      joinDate: '2024-01-10',
      lastLogin: 'Nunca',
      phone: '+34 600 678 901'
    }
  ];
  
  filteredUsers = computed(() => {
    let filtered = this.allUsers;
    
    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.department.toLowerCase().includes(term)
      );
    }
    
    // Filter by role
    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }
    
    // Filter by status
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(user => user.status === this.selectedStatus);
    }
    
    return filtered;
  });
  
  totalUsers = computed(() => this.allUsers.length);
  totalPages = computed(() => Math.ceil(this.filteredUsers().length / this.pageSize));
  currentPage = computed(() => this.currentPageIndex() + 1);
  
  paginatedUsers = computed(() => {
    const start = this.currentPageIndex() * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredUsers().slice(start, end);
  });
  
  onSearch() {
    this.currentPageIndex.set(0);
  }
  
  onRoleChange() {
    this.currentPageIndex.set(0);
  }
  
  onStatusChange() {
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
  
  getRoleVariant(role: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (role) {
      case 'admin': return 'destructive';
      case 'manager': return 'default';
      case 'employee': return 'secondary';
      case 'guest': return 'outline';
      default: return 'outline';
    }
  }
  
  getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'pending': return 'outline';
      case 'suspended': return 'destructive';
      default: return 'outline';
    }
  }
}