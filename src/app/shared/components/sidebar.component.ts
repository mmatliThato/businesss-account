import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <nav class="sidebar-wrapper">
      <a [routerLink]="['/home']" 
         routerLinkActive="active-state" 
         [routerLinkActiveOptions]="{exact: true}"
         class="nav-item">
        <mat-icon>home</mat-icon>
        <span class="nav-label">Home</span>
      </a>

      <a [routerLink]="['/business-accounts']" 
         routerLinkActive="active-state" 
         class="nav-item">
        <mat-icon>send</mat-icon>
        <span class="nav-label">MAP Connect</span>
      </a>

      <a [routerLink]="['/deleted-items']" 
         routerLinkActive="active-state" 
         class="nav-item">
        <mat-icon>delete</mat-icon>
        <span class="nav-label">Deleted Items</span>
      </a>
    </nav>
  `,
  styles: [`
    .sidebar-wrapper {
      width: 64px;
      height: 100vh;
      background-color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 16px;
      border-right: 1px solid #E5E7EB;
      box-sizing: border-box;
    }

    .nav-item {
      width: 64px;
      height: 64px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px 4px;
      border-radius: 8px;
      text-decoration: none;
      color: #718096;
      background: #FFFFFF;
      box-sizing: border-box;
      position: relative; /* Necessary for the absolute positioned line */
      transition: all 0.2s ease;
    }

    /* THE FIX: Use a pseudo-element for a straight line */
    .nav-item.active-state::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px; /* Your 2px Figma spec */
      background-color: #0033AA;
      /* No border-radius here means the line stays straight */
    }

    .nav-item.active-state {
      color: #0033AA !important;
      background-color: #F8FAFC !important;
      /* Remove the old border-left that was curving */
      border-left: none !important; 
    }
    .nav-label {
      font-size: 10px;
      font-weight: 400;
      line-height: 130%;
      text-align: center;
    }

    .nav-item:hover:not(.active-state) {
      background-color: #F1F5F9;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}