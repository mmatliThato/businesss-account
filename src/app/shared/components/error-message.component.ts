import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-container">
      <span>{{ message }}</span>
      <button (click)="retry.emit()" class="retry-button">Retry</button>
    </div>
  `,
  styles: [
    `
      .error-container {
        background-color: #fee2e2;
        color: #991b1b;
        padding: 16px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .retry-button {
        background-color: #ef4444;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;

        &:hover {
          background-color: #dc2626;
        }
      }
    `,
  ],
})
export class ErrorMessageComponent {
  @Input() message = '';
  @Output() retry = new EventEmitter<void>();
}
