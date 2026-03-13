import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-container">
      <button
        class="tab-button"
        [class.active]="currentTab === 'profile'"
        (click)="onTabChange('profile')">
        Business Profile
      </button>
      <button
        class="tab-button"
        [class.active]="currentTab === 'templates'"
        (click)="onTabChange('templates')">
        Message Templates
      </button>
    </div>
  `,
  styles: [`
    .tab-container {
      display: flex;
      gap: 32px; /* Increased gap to match Figma spacing */
      margin-bottom: 24px;
      border-bottom: 1px solid #CED3D9; /* Light grey bottom border for the full row */
      width: 1280px; /* Matching the 1280px layout width */
    }

    .tab-button {
      background: none;
      border: none;
      padding: 12px 0; /* Vertical padding only */
      font-family: 'Benton Sans Pro', sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 130%;
      color: #697786; /* Neutral grey for inactive tabs */
      cursor: pointer;
      position: relative;
      transition: color 0.2s ease;
      outline: none;
    }

    .tab-button:hover {
      color: #003FCA;
    }

    .tab-button.active {
      color: #003FCA; /* Precise Figma secondary blue */
      font-weight: 600;
    }

    /* Figma-style indicator line */
    .tab-button.active::after {
      content: '';
      position: absolute;
      bottom: -1px; /* Overlap the container border */
      left: 0;
      width: 100%;
      height: 2px;
      background: #003FCA;
      border-radius: 2px 2px 0 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent {
  @Input() currentTab: 'profile' | 'templates' = 'profile';
  @Output() tabSelected = new EventEmitter<'profile' | 'templates'>();

  onTabChange(tab: 'profile' | 'templates') {
    if (this.currentTab !== tab) {
      this.tabSelected.emit(tab);
    }
  }
}