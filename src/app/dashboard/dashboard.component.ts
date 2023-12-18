import { BehaviorSubject, Observable, take } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public users$: BehaviorSubject<User[] | null> = new BehaviorSubject<
    User[] | null
  >(null);
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.dashboardService
      .getAllUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.users$?.next(users);
      });
  }
  public searchUsers(username: any) {
    //when filter does not pass instead of dont do nothing, try to show a spinner laoding and then if not data match just show a meesage of no data to shown
    if (
      username.target.value.length > 4 &&
      !username.target.value.includes('flowww')
    ) {
      this.dashboardService
        .findUsers(username.target.value)
        .pipe(take(1))
        .subscribe((users) => {
          this.users$?.next(users);
        });
    } else if (username.target.value.includes('flowww')) {
      this.users$.next([]);
    } else if (username.target.value.length == 0) {
      this.dashboardService
        .getAllUsers()
        .pipe(take(1))
        .subscribe((users) => {
          this.users$?.next(users);
        });
    }
  }
}
