import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'notification-pop-up',
  template: `
    <div *ngIf="message" class="notification-popup">
      <div class="notification-box">
        <span>{{ message }}</span>
        <button class="close-button" (click)="closeNotification()">X</button>
      </div>
    </div>
  `,
  styleUrl: './notification-pop-up.component.css',
})
export class NotificationPopUpComponent {
  @Input() message: string | null = null;
  constructor(private notificationService: NotificationService) {}
  public closeNotification() {
    this.notificationService.getNotification(null);
  }
}
