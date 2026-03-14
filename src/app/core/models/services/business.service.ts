import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BusinessAccount, BusinessProfile } from '../business.model';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  private http = inject(HttpClient);
  private baseUrl = 'https://2fbf680e-be98-49d0-9bd2-d04d1fee94cf.mock.pstmn.io';

  accounts = signal<BusinessAccount[]>([]);
  profiles = signal<BusinessProfile[]>([]);
  loading = signal<boolean>(false);

  fetchAccounts(): Observable<BusinessAccount[]> {
    this.loading.set(true);
    return this.http.get<BusinessAccount[]>(`${this.baseUrl}/business-accounts`).pipe(
      tap((data) => {
        this.accounts.set(data);
        this.loading.set(false);
      }),
    );
  }

  fetchProfiles(): Observable<BusinessProfile[]> {
    this.loading.set(true);
    return this.http.get<BusinessProfile[]>(`${this.baseUrl}/business-profiles`).pipe(
      tap((data) => {
        this.profiles.set(data);
        this.loading.set(false);
      }),
    );
  }
}
