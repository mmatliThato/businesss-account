import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { BusinessService } from '../../core/models/services/business.service';
import { BusinessAccount, BusinessProfile } from '../../core/models/business.model';
import { TabNavigationComponent } from '../business-profile/tab-navigation.component';

@Component({
  selector: 'app-business-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormsModule, 
    MatIconModule, 
    MatSlideToggleModule, 
    TabNavigationComponent
  ],
  templateUrl: './business-details.html',
  styleUrl: './business-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDetails {
  private businessService = inject(BusinessService);
  private route = inject(ActivatedRoute);

  // State Management
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  currentTab = signal<'profile' | 'templates'>('profile');
  
  // Data Storage
  account = signal<BusinessAccount | null>(null);
  profile = signal<BusinessProfile | null>(null);
  isAccount = signal<boolean>(true);

  // Form Signals (Figma Set-up API Section)
  apiName = signal<string>('Populated');
  description = signal<string>('');
  apiEnvironment = signal<'development' | 'production'>('development');
  
  // API Settings Section
  replyCallbackEnabled = signal<boolean>(false);
  deliveryNotificationEnabled = signal<boolean>(false);
  apiAddress = signal<string>('');
  clientSecret = signal<string>('');
  scope = signal<string>('');

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetails(id);
    }
  }

  loadDetails(id: string) {
    this.loading.set(true);
    
    // Attempt to find data in the existing service state
    const accountData = this.businessService.accounts().find(a => a.Id === id);
    const profileData = this.businessService.profiles().find(p => p.Id === id);

    if (accountData) {
      this.isAccount.set(true);
      this.account.set(accountData);
      this.loading.set(false);
    } else if (profileData) {
      this.isAccount.set(false);
      this.profile.set(profileData);
      this.syncFormData(profileData);
      this.loading.set(false);
    } else {
      this.fetchFromApi(id);
    }
  }

  // Syncs incoming data to the editable form signals
  private syncFormData(data: BusinessProfile) {
    this.apiAddress.set(data.ApiAddress || '');
    this.clientSecret.set(data.ClientSecret || '');
    this.replyCallbackEnabled.set(data.ReplyCallbackEnabled || false);
  }

  private fetchFromApi(id: string) {
    this.businessService.fetchProfiles().subscribe({
      next: () => this.loadDetails(id),
      error: () => {
        this.error.set('Details not found');
        this.loading.set(false);
      }
    });
  }

  // --- UI Helpers (Used in HTML) ---

  getDisplayName(): string {
    return (this.isAccount() ? this.account()?.Name : this.profile()?.Name) || 'Unknown';
  }

  getWhatsAppNumber(): string {
    return (this.isAccount() ? this.account()?.WhatsAppNumber : this.profile()?.WhatsAppNumber) || '—';
  }

  getAccountId(): string {
    return (this.isAccount() ? this.account()?.Id : this.profile()?.Id) || '—';
  }

  getPhoneId(): string {
    return (this.isAccount() ? this.account()?.PhoneNumberId : this.profile()?.PhoneNumberId) || '—';
  }

  getStatus(): boolean {
    return (this.isAccount() ? this.account()?.isActive : this.profile()?.isActive) || false;
  }

  onUpdate() {
    console.log('Updating API Settings:', {
      env: this.apiEnvironment(),
      address: this.apiAddress(),
      secret: this.clientSecret()
    });
    // Logic to call your BusinessService update method goes here
  }
}