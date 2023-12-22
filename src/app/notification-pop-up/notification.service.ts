import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorNotification } from '../../interfaces/error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  public notification$: BehaviorSubject<ErrorNotification | null> =
    new BehaviorSubject<ErrorNotification | null>(null);

  getNotification(message: string | null) {
    return this.notification$.next({ message });
  }
}
