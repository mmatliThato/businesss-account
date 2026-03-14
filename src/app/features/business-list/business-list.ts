import {
  Component,
  inject,
  signal,
  ViewChild,
  AfterViewInit,
  effect,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BusinessService } from '../../core/models/services/business.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TabNavigationComponent } from '../business-profile/tab-navigation.component';
import { BusinessProfile } from '../../core/models/business.model';

@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [
    CommonModule,
    TabNavigationComponent,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './business-list.html',
  styleUrl: './business-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessList implements AfterViewInit {
  public businessService = inject(BusinessService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  readonly selectedFilter = signal<'all' | 'active' | 'inactive'>('all');
  readonly currentTab = signal<'profile' | 'templates'>('profile');

  dataSource = new MatTableDataSource<BusinessProfile>([]);
  readonly displayedColumns: string[] = [
    'name',
    'accountId',
    'whatsapp',
    'phoneId',
    'status',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.businessService.fetchProfiles().subscribe();

    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.includes(filter);
    };

    effect(() => {
      let data = this.currentTab() === 'profile' ? this.businessService.profiles() : [];

      if (this.selectedFilter() === 'active') {
        data = data.filter((item) => item.isActive === true);
      } else if (this.selectedFilter() === 'inactive') {
        data = data.filter((item) => item.isActive === false);
      }

      this.dataSource.data = [...data].sort((a, b) =>
        (a.Name || '').toLowerCase().localeCompare((b.Name || '').toLowerCase()),
      );

      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  setFilter(filter: 'all' | 'active' | 'inactive'): void {
    this.selectedFilter.set(filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['/business-details', id]);
  }
}
