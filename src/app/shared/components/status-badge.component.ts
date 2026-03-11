import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-badge" [class.active]="isActive">
      {{ displayText }}
    </span>
  `,
  styles: [
    `
      .status-badge {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 13px;
        font-weight: 500;
        text-transform: uppercase;
      }

      .status-badge.active {
        background-color: #dcfce7;
        color: #16a34a;
        box-shadow: 0 2px 4px rgba(22, 163, 74, 0.1);
      }

      .status-badge:not(.active) {
        background-color: #fef2f2;
        color: #dc2626;
        box-shadow: 0 2px 4px rgba(220, 38, 38, 0.1);
      }
    `,
  ],
})
export class StatusBadgeComponent {
  @Input() isActive = false;
  @Input() displayText: string = '';

  constructor() {
    this.displayText = this.isActive ? 'Active' : 'Inactive';
  }
}