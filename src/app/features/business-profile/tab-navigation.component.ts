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
      gap: 24px;
      margin-bottom: 20px;
    }

    .tab-button {
      background: none;
      border: none;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      line-height: 130%;
      color: #697786;
      cursor: pointer;
      height: 36px;
      transition: color 0.2s ease;
    }

    .tab-button.active {
      color: #0051FF;
      border-bottom: 2px solid #0051FF;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent {
  @Input() currentTab: 'profile' | 'templates' = 'profile';
  @Output() tabSelected = new EventEmitter<'profile' | 'templates'>();

  onTabChange(tab: 'profile' | 'templates') {
    this.tabSelected.emit(tab);
  }
}