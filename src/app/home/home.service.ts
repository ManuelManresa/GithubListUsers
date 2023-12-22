import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concat, exhaustMap, map, take } from 'rxjs';
import { User } from '../../interfaces/user';
import { FindUsers } from '../../interfaces/responsesInterfaces';
import { ProfileService } from '../profile/profile.service';
import { NotificationService } from '../notification-pop-up/notification.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {}

  findUsers(username: string, pageNumber: number = 0): Observable<FindUsers> {
    const usersDataComplete: User[] = [];

    const result: FindUsers = {
      items: [],
      incomplete_results: false,
      total_count: 0,
    };
    return this.http
      .get<FindUsers>(
        `search/users?q=${username}+in:login&per_page=10&page=${pageNumber}`
      )
      .pipe(
        map((data) => {
          if (data.items.length === 0) {
            this.notificationService.getNotification(
              `User not found, try again with other username`
            );
            throw new Error('No data found');
          }
          result.incomplete_results = data.incomplete_results;
          result.total_count = data.total_count;
          return data;
        }),
        map((users) => users.items.map((user) => user.url)),
        exhaustMap((usersUrls) => {
          const usersDataComplete = usersUrls.map((url) =>
            this.profileService.getUser(url).pipe(take(1))
          );

          return concat(...usersDataComplete);
        }),
        map((users) => {
          usersDataComplete.push(users);
          result.items = usersDataComplete;
          return result;
        })
      );
  }
}
