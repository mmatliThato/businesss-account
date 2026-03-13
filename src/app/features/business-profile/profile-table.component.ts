import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Fixed: Added this
import { BusinessProfile } from '../../core/models/business.model';

@Component({
  selector: 'app-profile-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule, // Fixed: Added to imports
  ],
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss'], // Note: Ensure this file exists!
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileTableComponent {
  @Input() profiles: BusinessProfile[] = [];
  @Input() loading = false;
  @Input() searchQuery = ''; // Fixed: Added input since your HTML tries to bind to this
  @Input() error: string | null = null;

  displayedColumns: string[] = [
    'select',
    'name',
    'phoneNumberId',
    'whatsappNumber',
    'maintenanceMessageEnabled',
    'isActive',
    'actions',
  ];

  @Output() refresh = new EventEmitter<void>();
}
