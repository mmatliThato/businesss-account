import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { BusinessService } from '../../core/models/services/business.service';
import { BusinessAccount, BusinessProfile } from '../../core/models/business.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-business-details',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
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

  apiName = signal<string>('');
  apiEnvironment = signal<'development' | 'production'>('development');
  replyCallbackEnabled = signal<boolean>(false);
  apiAddress = signal<string>('');
  clientSecret = signal<string>('');

  constructor() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.id.set(id);
    this.loadDetails(id);
  }

  onUpdate(): void {
    console.log('Update payload:', {
      id: this.id(),
      name: this.apiName(),
      environment: this.apiEnvironment(),
      address: this.apiAddress(),
      callback: this.replyCallbackEnabled(),
    });
  }

  toggleReplyCallback(): void {
    this.replyCallbackEnabled.update((val) => !val);
  }

  getAccountId(): string {
    return this.id();
  }

  loadDetails(id: string) {
    this.loading.set(true);
    this.error.set(null);

    const account = this.businessService.accounts().find(a => a.Id === id);

    if (account) {
      this.isAccount.set(true);
      this.account.set(account);
      this.apiName.set(account.Name || '');
      this.loading.set(false);
      return;
    }

    const profile = this.businessService.profiles().find(p => p.Id === id);

    if (profile) {
      this.isAccount.set(false);
      this.profile.set(profile);

      this.apiName.set(profile.Name || '');
      this.apiAddress.set(profile.ApiAddress || '');
      this.clientSecret.set(profile.ClientSecret || '');
      this.replyCallbackEnabled.set(profile.ReplyCallbackEnabled || false);

      this.loading.set(false);
      return;
    }

    this.fetchFromApi(id);
  }

  private fetchFromApi(id: string) {
    const hasAccounts = this.businessService.accounts().length > 0;
    const hasProfiles = this.businessService.profiles().length > 0;

    if (!hasAccounts) {
      this.businessService.fetchAccounts();
    }

    if (!hasProfiles) {
      this.businessService.fetchProfiles();
    }

    setTimeout(() => {
      this.loadDetails(id);
    }, 500);
  }

  getDisplayName(): string {
    return this.isAccount()
      ? this.account()?.Name || ''
      : this.profile()?.Name || '';
  }

  getWhatsAppNumber(): string {
    return this.isAccount()
      ? this.account()?.WhatsAppNumber || ''
      : this.profile()?.WhatsAppNumber || '';
  }

  getStatus(): boolean {
    return this.isAccount()
      ? this.account()?.isActive || false
      : this.profile()?.isActive || false;
  }
}