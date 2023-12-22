import { BehaviorSubject, catchError, of } from 'rxjs';
import { HomeService } from './home.service';
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
  public currentPageNumber: number = 0;
  public totalPageNumbers: number = 1;
  public nextPageGroup: number = 1;
  constructor(
    private homeService: HomeService,
    public profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public searchUsers(page?: number) {
    //when filter does not pass instead of dont do nothing, try to show a spinner laoding and then if not data match just show a meesage of no data to shown
    if (
      this.searchString.length > 4 &&
      !this.searchString.includes('flowww') &&
      page != this.currentPageNumber
    ) {
      this.loadingData = true;

      this.homeService
        .findUsers(this.searchString, page)
        .pipe(
          catchError((error) => {
            this.loadingData = false;
            return of([]);
          })
        )
        .subscribe((users: any) => {
          this.loadingData = false;
          this.totalPageNumbers = page
            ? this.totalPageNumbers
            : Math.ceil(users.total_count / 10);
          this.currentPageNumber = page ? page : 1;
          this.users$.next(users.items);
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

  public getNumberArray(length: number): number[] {
    return new Array(length);
  }

  public isCurrentPageSelected(pageNumber: number) {
    return pageNumber + 1 == this.currentPageNumber;
  }
}
