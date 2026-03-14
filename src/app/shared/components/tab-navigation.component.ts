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
        (click)="onTabChange('profile')"
      >
        Business Profile
      </button>
      <button class="tab-button disabled">Message Templates</button>
    </div>
  `,
  styles: [
    `
      .tab-container {
        display: flex;
        gap: 32px;
        margin-bottom: 24px;
        width: 1280px;
      }

      .tab-button {
        background: none;
        border: none;
        padding: 12px 0;
        font-family: 'Benton Sans Pro', sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 130%;
        color: #697786;
        cursor: pointer;
        position: relative;
        outline: none;
      }

      .tab-button.active {
        color: #0051ff;
        font-weight: 600;
      }

      .tab-button.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #0051ff;
        border-radius: 2px 2px 0 0;
      }

      .tab-button.disabled {
        cursor: default;
        color: #b0b8c1;
        pointer-events: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent {
  @Input() currentTab: 'profile' | 'templates' = 'profile';
  @Output() tabSelected = new EventEmitter<'profile' | 'templates'>();

  onTabChange(tab: 'profile' | 'templates') {
    if (this.currentTab !== tab && tab === 'profile') {
      this.tabSelected.emit(tab);
    }
  }
}
