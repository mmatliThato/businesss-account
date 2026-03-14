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
      <div class="nav-stack">
        <a
          [routerLink]="['/business-accounts']"
          routerLinkActive="active-state"
          [routerLinkActiveOptions]="{ exact: false }"
          class="nav-item"
        >
          <div class="icon-container">
            <mat-icon>home</mat-icon>
          </div>
          <span class="nav-label">Home</span>
        </a>

        <a [routerLink]="['/map-connect']" routerLinkActive="active-state" class="nav-item">
          <div class="icon-container">
            <mat-icon>send</mat-icon>
          </div>
          <span class="nav-label">MAP Connect</span>
        </a>

        <a [routerLink]="['/deleted-items']" routerLinkActive="active-state" class="nav-item">
          <div class="icon-container">
            <mat-icon>delete</mat-icon>
          </div>
          <span class="nav-label">Deleted Items</span>
        </a>
      </div>
    </nav>
  `,
  styles: [
    `
      .sidebar-wrapper {
        width: 64px;
        height: 100vh;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 16px;
        border-right: 1px solid #ced3d9;
        box-sizing: border-box;
      }

      .nav-stack {
        display: flex;
        flex-direction: column;
        gap: 8px;
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
        text-decoration: none;
        color: #222e37;
        background: #ffffff;
        border-radius: 8px;
        position: relative;
        transition: all 0.2s ease;
        box-sizing: border-box;
      }

      .nav-item.active-state {
        color: var(--secondary-color, #0051ff) !important;
        background-color: rgba(0, 81, 255, 0.04);
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);

          width: 3px;
          height: 48px;

          background: var(--secondary-color, #0051ff);
          border-radius: 4px;
        }
      }

      .icon-container {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: inherit;
      }

      .nav-label {
        width: 56px;
        height: 26px;
        font-family: 'Benton Sans Pro', sans-serif;
        font-size: 10px;
        font-weight: 400;
        line-height: 130%;
        text-align: center;
        letter-spacing: 0px;
        color: inherit;
        display: block;
      }

      .nav-item:hover:not(.active-state) {
        background-color: #f8f8fa;
        color: #0051ff;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
