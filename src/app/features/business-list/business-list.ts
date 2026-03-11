import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { BusinessService } from '../../core/models/services/business.service';
import { BusinessAccount, BusinessProfile } from '../../core/models/business.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-business-list',
  imports: [CommonModule, RouterLink, SharedModule],
  templateUrl: './business-list.html',
  styleUrl: './business-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessList {
  private businessService = inject(BusinessService);
  accounts = this.businessService.accounts;
  profiles = this.businessService.profiles;
  loading = this.businessService.loading;
  error = signal<string | null>(null);

  isAccountsView = signal<boolean>(true);
  pageSize = signal<number>(10);
  currentPage = signal<number>(0);
  searchTerm = signal<string>('');
  activeFilter = signal<'all' | 'active' | 'maintenance'>('all');

  constructor() {
    this.loadData();
  }

  loadData() {
    this.error.set(null);
    if (this.isAccountsView()) {
      this.businessService.fetchAccounts().subscribe({
        error: (err: unknown) => {
          this.error.set('Failed to load business accounts. Please try again.');
          console.error(err);
        }
      });
    } else {
      this.businessService.fetchProfiles().subscribe({
        error: (err: unknown) => {
          this.error.set('Failed to load business profiles. Please try again.');
          console.error(err);
        }
      });
    }
  }

  toggleView() {
    this.isAccountsView.update(v => !v);
    this.currentPage.set(0); // Reset page when switching views
    this.activeFilter.set('all'); // Reset filter
    this.loadData();
  }

  onPageChange(pageIndex: number) {
    this.currentPage.set(pageIndex);
  }

  setActiveFilter(filter: 'all' | 'active' | 'maintenance') {
    this.activeFilter.set(filter);
    this.currentPage.set(0); // Reset to first page when filter changes
  }

  getPaginatedData(): BusinessAccount[] | BusinessProfile[] {
    const data = this.isAccountsView() ? this.accounts() : this.profiles();
    let filteredData = [...data]; // Create a copy

    // Apply search filter
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      filteredData = filteredData.filter(item =>
        item.Name.toLowerCase().includes(term) ||
        item.WhatsAppNumber.includes(term)
      );
    }

    // Apply active/maintenance filter
    switch (this.activeFilter()) {
      case 'active':
        filteredData = filteredData.filter(item => item.isActive);
        break;
      case 'maintenance':
        filteredData = filteredData.filter(item => item.MaintenanceMessageEnabled);
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    const startIndex = this.currentPage() * this.pageSize();
    return filteredData.slice(startIndex, startIndex + this.pageSize());
  }

  getTotalPages(): number {
    let data = this.isAccountsView() ? this.accounts() : this.profiles();

    // Apply search filter for total count
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      data = data.filter(item =>
        item.Name.toLowerCase().includes(term) ||
        item.WhatsAppNumber.includes(term)
      );
    }

    // Apply active/maintenance filter
    switch (this.activeFilter()) {
      case 'active':
        data = data.filter(item => item.isActive);
        break;
      case 'maintenance':
        data = data.filter(item => item.MaintenanceMessageEnabled);
        break;
      default:
        break;
    }

    return Math.ceil(data.length / this.pageSize());
  }

  getTotalRecords(): number {
    let data = this.isAccountsView() ? this.accounts() : this.profiles();

    // Apply active/maintenance filter for total count
    switch (this.activeFilter()) {
      case 'active':
        data = data.filter(item => item.isActive);
        break;
      case 'maintenance':
        data = data.filter(item => item.MaintenanceMessageEnabled);
        break;
      default:
        break;
    }

    return data.length;
  }

  getActiveCount(): number {
    const data = this.isAccountsView() ? this.accounts() : this.profiles();
    return data.filter(item => item.isActive).length;
  }

  getMaintenanceCount(): number {
    const data = this.isAccountsView() ? this.accounts() : this.profiles();
    return data.filter(item => item.MaintenanceMessageEnabled).length;
  }

  isFilterActive(filter: 'all' | 'active' | 'maintenance'): boolean {
    return this.activeFilter() === filter;
  }
}
