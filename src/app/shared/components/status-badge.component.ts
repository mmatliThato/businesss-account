import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  template: `
    <span class="status-badge" [class.active]="isActive">
      {{ isActive ? 'Active' : 'Inactive' }}
    </span>
  `,
  styles: [
    `
      .status-badge {
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 500;
        display: inline-block;
        line-height: 1.4;
      }

      .status-badge.active {
        background-color: #dcfce7;
        color: #16a34a;
        border: 1px solid #bbf7d0;
      }

      .status-badge:not(.active) {
        background-color: #fee2e2;
        color: #dc2626;
        border: 1px solid #fed7d7;
      }
    `,
  ],
})
export class StatusBadgeComponent {
  @Input() isActive = false;
}
