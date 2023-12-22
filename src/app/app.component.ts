import { BehaviorSubject, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification-pop-up/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public message$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  constructor(private notificationService: NotificationService) {
    this.notificationService.notification$.subscribe((message) => {
      this.message$.next(message?.message ? message.message : null);
    });
  }
}
