import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { BusinessService } from '../../core/models/services/business.service';
import { BusinessAccount, BusinessProfile } from '../../core/models/business.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-business-details',
  imports: [CommonModule, RouterLink, SharedModule, FormsModule],
  templateUrl: './business-details.html',
  styleUrl: './business-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDetails {
  private businessService = inject(BusinessService);
  private route = inject(ActivatedRoute);

  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  account = signal<BusinessAccount | null>(null);
  profile = signal<BusinessProfile | null>(null);
  isAccount = signal<boolean>(true);
  id = signal<string>('');

  // API Settings Form
  apiEnvironment = signal<'development' | 'production'>('development');
  replyCallbackEnabled = signal<boolean>(false);
  apiAddress = signal<string>('');
  clientSecret = signal<string>('');

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.id.set(id);
    this.loadDetails(id);
  }

  loadDetails(id: string) {
    this.loading.set(true);
    this.error.set(null);

    // Try to find in accounts first
    const account = this.businessService.accounts().find((a: BusinessAccount) => a.Id === id);
    if (account) {
      this.isAccount.set(true);
      this.account.set(account);
      this.loading.set(false);
      return;
    }

    // Then try profiles
    const profile = this.businessService.profiles().find((p: BusinessProfile) => p.Id === id);
    if (profile) {
      this.isAccount.set(false);
      this.profile.set(profile);
      // Initialize form with existing data
      this.apiAddress.set(profile.ApiAddress || '');
      this.clientSecret.set(profile.ClientSecret || '');
      this.replyCallbackEnabled.set(profile.ReplyCallbackEnabled || false);
      this.loading.set(false);
      return;
    }

    // If not found in either, fetch from API
    this.fetchFromApi(id);
  }

  private fetchFromApi(id: string) {
    // Check if we need to load accounts or profiles
    const hasAccounts = this.businessService.accounts().length > 0;
    const hasProfiles = this.businessService.profiles().length > 0;

    if (!hasAccounts && !hasProfiles) {
      // Load both if nothing is loaded
      this.businessService.fetchAccounts().subscribe({
        error: (err: unknown) => {
          this.error.set('Failed to load data. Please try again.');
          console.error(err);
          this.loading.set(false);
        },
      });
      this.businessService.fetchProfiles().subscribe({
        error: (err: unknown) => {
          this.error.set('Failed to load data. Please try again.');
          console.error(err);
          this.loading.set(false);
        },
        complete: () => {
          this.loadDetails(id); // Retry after loading
        },
      });
    } else if (!hasAccounts) {
      // Load accounts only
      this.businessService.fetchAccounts().subscribe({
        error: (err: unknown) => {
          this.error.set('Failed to load data. Please try again.');
          console.error(err);
          this.loading.set(false);
        },
        complete: () => {
          this.loadDetails(id); // Retry after loading
        },
      });
    } else if (!hasProfiles) {
      // Load profiles only
      this.businessService.fetchProfiles().subscribe({
        error: (err: unknown) => {
          this.error.set('Failed to load data. Please try again.');
          console.error(err);
          this.loading.set(false);
        },
        complete: () => {
          this.loadDetails(id); // Retry after loading
        },
      });
    } else {
      // Both are loaded, item not found
      this.error.set('Business not found');
      this.loading.set(false);
    }
  }

  getDisplayName(): string {
    return this.isAccount() ? this.account()?.Name || '' : this.profile()?.Name || '';
  }

  getWhatsAppNumber(): string {
    return this.isAccount()
      ? this.account()?.WhatsAppNumber || ''
      : this.profile()?.WhatsAppNumber || '';
  }

  getStatus(): boolean {
    return this.isAccount() ? this.account()?.isActive || false : this.profile()?.isActive || false;
  }
}