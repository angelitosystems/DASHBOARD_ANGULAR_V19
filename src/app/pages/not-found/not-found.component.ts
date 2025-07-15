import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HlmButtonDirective } from '../../components/ui/ui-button-helm/src';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHouse, lucideArrowLeft, lucideSearch } from '@ng-icons/lucide';

@Component({
  selector: 'angelitosystems-not-found',
  standalone: true,
  imports: [CommonModule, HlmButtonDirective, HlmIconDirective, NgIcon],
  providers: [provideIcons({ lucideHouse, lucideArrowLeft, lucideSearch })],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFound {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    window.history.back();
  }
}