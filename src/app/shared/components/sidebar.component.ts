import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="app-sidenav">
        <div class="sidenav-header">
          <div class="user-profile">
            <img src="assets/avatar.png" alt="User avatar" class="avatar">
            <div class="user-info">
              <span class="welcome-text">Welcome back</span>
              <span class="user-name">Admin User</span>
            </div>
          </div>
        </div>

        <mat-nav-list>
          <a mat-list-item [routerLink]="['/business-accounts']" routerLinkActive="active-link">
            <mat-icon matListIcon>account_balance</mat-icon>
            <span>Business Accounts</span>
          </a>

          <a mat-list-item [routerLink]="['/business-profiles']" routerLinkActive="active-link">
            <mat-icon matListIcon>person_outline</mat-icon>
            <span>Business Profiles</span>
          </a>

          <div class="nav-divider"></div>

          <h3 mat-subheader>Settings</h3>
          <a mat-list-item [routerLink]="['/settings']" routerLinkActive="active-link">
            <mat-icon matListIcon>settings</mat-icon>
            <span>Application Settings</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .app-sidenav {
      width: 280px;
      background-color: white;
      border-right: 1px solid #e5e7eb;
      overflow-y: auto;
    }

    .sidenav-header {
      padding: 32px 24px;
      border-bottom: 1px solid #e5e7eb;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      background-color: #e5e7eb;
    }

    .user-info {
      flex: 1;
    }

    .welcome-text {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .user-name {
      display: block;
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }

    mat-nav-list {
      padding-top: 0;
    }

    a[mat-list-item] {
      color: #4b5563;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    a[mat-list-item]:hover {
      background-color: #f9fafb;
      color: #1e88e5;
    }

    a[mat-list-item].active-link {
      background-color: #e3f2fd;
      color: #1e88e5;
      font-weight: 600;
    }

    mat-icon[matListIcon] {
      color: #7c8a98;
      margin-right: 16px;
    }

    a[mat-list-item].active-link mat-icon[matListIcon] {
      color: #1e88e5;
    }

    .nav-divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 8px 0;
    }

    h3[mat-subheader] {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #6b7280;
      padding: 8px 24px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}