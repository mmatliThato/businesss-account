import {
  Component,
  inject,
  signal,
  ViewChild,
  AfterViewInit,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Removed RouterLink since we use (click)
import { SharedModule } from '../../shared/shared.module';
import { BusinessService } from '../../core/models/services/business.service';

// Material Imports
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu'; // Added for three-dots menu
import { MatDividerModule } from '@angular/material/divider'; // Added for menu separator
import { TabNavigationComponent } from '../business-profile/tab-navigation.component';

@Component({
  selector: 'app-business-list',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TabNavigationComponent,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule, // Necessary for [matMenuTriggerFor]
    MatDividerModule, // Necessary for <mat-divider>
  ],
  templateUrl: './business-list.html',
  styleUrl: './business-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessList implements AfterViewInit {
  private businessService = inject(BusinessService);
  private router = inject(Router);

  // Data State from Service
  loading = this.businessService.loading;

  // Material Table Setup
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'accountId', 'whatsapp', 'phoneId', 'status', 'actions'];

  // UI State
  currentTab = signal<'profile' | 'templates'>('profile');

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Effect to reactively update the table when data or tab changes
    effect(() => {
      const data = this.currentTab() === 'profile' ? this.businessService.profiles() : [];
      this.dataSource.data = data;
    });

    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.businessService.fetchAccounts().subscribe();
    this.businessService.fetchProfiles().subscribe();
  }

  // Filter logic for the search bar
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Navigation to the detail page (triggered by row click or menu)
  navigateToDetails(id: string) {
    console.log('Navigating to Business Details:', id);
    this.router.navigate(['/business-details', id]);
  }

  // Placeholder for the "Add Profile" button
  addProfile() {
    console.log('Open add profile action');
    // You can navigate or open a dialog here
  }

  // Placeholder for the "Delete" action in the menu
  deleteBusiness(element: any) {
    console.log('Delete requested for:', element.Name);
    // Add your service call here later
  }
}
