import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-action-bar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  template: `
    <div class="action-bar">
      <div class="search-container">
        <mat-icon class="search-icon">search</mat-icon>
        <input
          type="text"
          placeholder="Search profiles..."
          [value]="searchQuery"
          (input)="onSearch($event)"
        />
      </div>

      <div class="spacer"></div>

      <button mat-icon-button (click)="refresh.emit()">
        <mat-icon>refresh</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>settings</mat-icon>
      </button>
      <button mat-flat-button color="primary" class="add-profile-btn">+ Add Profile</button>
    </div>
  `,
  styles: [
    `
      .action-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 0;
      }

      .search-container {
        display: flex;
        align-items: center;
        background: #f4f7f9;
        border-radius: 8px;
        padding: 0 12px;
        flex: 1;
        max-width: 400px;
        height: 40px;
      }

      .search-container input {
        border: none;
        background: transparent;
        outline: none;
        padding: 8px;
        width: 100%;
        font-size: 14px;
      }

      .search-icon {
        color: #697786;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .spacer {
        flex: 1;
      }

      button[mat-icon-button] {
        background-color: #f4f7f9;
        border-radius: 8px;
        color: #222e37;
      }

      .add-profile-btn {
        background-color: #0051ff !important;
        border-radius: 8px;
        height: 40px;
        padding: 0 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBarComponent {
  // 1. This fixes the NG8002 Error
  @Input() searchQuery: string = '';

  // 2. This allows the parent to listen for changes
  @Output() searchChange = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}
