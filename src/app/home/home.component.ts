import { BehaviorSubject, concat, exhaustMap, map, take } from 'rxjs';
import { DashboardService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { ProfileService } from '../profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public users$: BehaviorSubject<User[] | null> = new BehaviorSubject<
    User[] | null
  >(null);
  public searchString: string = '';
  public loadingData: boolean = false;
  constructor(
    private dashboardService: DashboardService,
    public profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public searchUsers() {
    //when filter does not pass instead of dont do nothing, try to show a spinner laoding and then if not data match just show a meesage of no data to shown
    if (this.searchString.length > 4 && !this.searchString.includes('flowww')) {
      this.loadingData = true;
      const usersDataComplete: User[] = [];
      this.dashboardService
        .findUsers(this.searchString)
        .pipe(
          take(1),
          map((users) => {
            this.loadingData = Boolean(users.length) ?? false;

            return users.map((user) => user.url);
          }),
          exhaustMap((usersUrls) => {
            const usersDataComplete = usersUrls.map((url) =>
              this.profileService.getUser(url).pipe(take(1))
            );

            return concat(...usersDataComplete);
          })
        )
        .subscribe((users) => {
          usersDataComplete.push(users);
          this.users$?.next(usersDataComplete);
          this.loadingData = false;
        });
    } else if (this.searchString.includes('flowww')) {
      window.alert('Not allowed this parameter on search');
      this.users$.next([]);
    }
  }
  public navigateToProfile(url: string) {
    const newUrl = this.router.serializeUrl(
      this.router.createUrlTree(['/profile'], {
        queryParams: { user: url },
      })
    );
    window.open(newUrl, '_blank');
  }
}
