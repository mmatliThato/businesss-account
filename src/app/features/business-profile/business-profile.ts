import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TabNavigationComponent } from './tab-navigation.component';
// 1. ADD THESE IMPORTS
import { ActionBarComponent } from './action-bar.component';
import { ProfileTableComponent } from './profile-table.component';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TabNavigationComponent,
    ActionBarComponent, // 2. ADD TO THIS ARRAY
    ProfileTableComponent, // 2. ADD TO THIS ARRAY
  ],
  templateUrl: './business-profile.html',
  styleUrl: './business-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessProfileComponent {
  currentTab = signal<'profile' | 'templates'>('profile');
  searchQuery = signal<string>('');
  sortOption = signal<'newest' | 'oldest'>('newest');

  switchTab(tab: 'profile' | 'templates') {
    this.currentTab.set(tab);
  }

  // 3. IMPROVE TYPE SAFETY FOR THE TEMPLATE
  handleSearch(event: any) {
    // This handles both direct strings and Event objects
    const value = typeof event === 'string' ? event : event?.target?.value;
    this.searchQuery.set(value || '');
  }

  onSortChange(option: 'newest' | 'oldest') {
    this.sortOption.set(option);
  }
}
