import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { User } from '../../../interfaces/user';
import { HomeService } from '../home.service';
import { NotificationService } from '../../notification-pop-up/notification.service';

@Component({
  selector: 'table-users',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() users$: BehaviorSubject<User[] | null> = new BehaviorSubject<
    User[] | null
  >(null);
  @Input() totalPageNumbers: number = 0;
  @Input() nextPageGroup: number = 1;
  @Input() currentPageNumber: number = 1;
  @Input() loadingData: boolean = false;
  @Input() searchString: string = '';
  @Output() searchUser: EventEmitter<number> = new EventEmitter<number>();

  public usernameUrl: string = '';

  constructor(
    private homeService: HomeService,
    private notificationService: NotificationService
  ) {}

  public searchUsers(page: number) {
    this.searchUser.emit(page);
  }
  public getNumberArray(length: number): number[] {
    return new Array(length);
  }

  public isCurrentPageSelected(pageNumber: number) {
    return pageNumber + 1 == this.currentPageNumber;
  }

  public openModal(url: string) {
    this.usernameUrl = url;
    this.open();
  }

  private open() {
    const modal = document.querySelector('dialog');
    modal?.showModal();
    document.addEventListener('click', ({ target }) => {
      if (target === modal) {
        modal?.close();
      }
    });
  }
}
