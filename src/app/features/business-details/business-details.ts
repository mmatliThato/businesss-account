import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { BusinessService } from '../../core/models/services/business.service';
import { BusinessAccount, BusinessProfile } from '../../core/models/business.model';

@Component({
  selector: 'app-business-details',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSlideToggleModule, MatRadioModule, MatIconModule],
  templateUrl: './business-details.html',
  styleUrl: './business-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessDetails implements OnInit {
  private businessService = inject(BusinessService);
  private route = inject(ActivatedRoute);

  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  id = signal<string>('');

  account = signal<BusinessAccount | null>(null);
  profile = signal<BusinessProfile | null>(null);
  isAccount = signal<boolean>(true);

  apiName = signal<string>('');
  apiEnvironment = signal<'development' | 'production'>('development');
  replyCallbackEnabled = signal<boolean>(false);
  apiAddress = signal<string>('');

  ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id') || '';
    this.id.set(routeId);
    this.loadDetails(routeId);
  }

  loadDetails(id: string) {
    this.loading.set(true);
    const foundAccount = this.businessService
      .accounts()
      .find((a) => (a.Id || (a as any).id) === id);
    if (foundAccount) {
      this.isAccount.set(true);
      this.account.set(foundAccount);
      this.syncForm(foundAccount);
      this.loading.set(false);
      return;
    }

    const foundProfile = this.businessService
      .profiles()
      .find((p) => (p.Id || (p as any).id) === id);
    if (foundProfile) {
      this.isAccount.set(false);
      this.profile.set(foundProfile);
      this.syncForm(foundProfile);
      this.loading.set(false);
      return;
    }
    this.loading.set(false);
  }

  private syncForm(data: any) {
    this.apiName.set(data.Name || data.name || '');
    this.apiEnvironment.set(data.environment || 'development');
    this.replyCallbackEnabled.set(data.ReplyCallbackEnabled || false);
    this.apiAddress.set(data.ApiAddress || '');
  }

  getDisplayName() {
    return this.isAccount() ? this.account()?.Name : this.profile()?.Name;
  }
  getWhatsAppNumber() {
    return this.isAccount() ? this.account()?.WhatsAppNumber : this.profile()?.WhatsAppNumber;
  }
  getStatus() {
    return this.isAccount() ? this.account()?.isActive : this.profile()?.isActive;
  }
  getAccountId() {
    return this.id();
  }

  getCreatedDate(): string {
    const rawDate = this.isAccount()
      ? (this.account() as any)?.DateCreated
      : (this.profile() as any)?.DateCreated;
    return rawDate ? new Date(rawDate).toLocaleDateString('en-GB') : 'N/A';
  }

  getMaskedKey(): string {
    const key = (this.profile() as any)?.ApiKey || '••••••••••••••••';
    return key.length > 4 ? `••••${key.slice(-4)}` : key;
  }

  onUpdate() {
    console.log('Updating:', { id: this.id(), name: this.apiName(), env: this.apiEnvironment() });
  }
}
