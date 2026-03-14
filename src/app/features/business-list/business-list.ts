import { Component, inject, signal, ViewChild, AfterViewInit, effect, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BusinessService } from '../../core/models/services/business.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TabNavigationComponent } from '../business-profile/tab-navigation.component';

@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [CommonModule, TabNavigationComponent, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatMenuModule,
   RouterLink

  ],
  templateUrl: './business-list.html',
  styleUrl: './business-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessList implements AfterViewInit {
  private businessService = inject(BusinessService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  readonly currentTab = signal<'profile' | 'templates'>('profile');
  dataSource = new MatTableDataSource<any>([]);
  readonly displayedColumns: string[] = ['name', 'accountId', 'whatsapp', 'phoneId', 'status', 'actions'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.businessService.fetchProfiles().subscribe();

    effect(() => {
      const data = this.currentTab() === 'profile' ? this.businessService.profiles() : [];
      this.dataSource.data = data;
      this.cdr.markForCheck(); 
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['/business-details', id]);
  }
}