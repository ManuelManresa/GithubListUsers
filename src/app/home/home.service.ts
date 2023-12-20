import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concat, exhaustMap, map, take } from 'rxjs';
import { User } from '../../interfaces/user';
import { FindUsers } from '../../interfaces/responsesInterfaces';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  findUsers(username: string, pageNumber: number = 1): Observable<User[]> {
    const usersDataComplete: User[] = [];

    return this.http
      .get<FindUsers>(
        `search/users?q=${username}+in:login&per_page=10&page=${pageNumber}`
      )
      .pipe(
        map((data) => {
          if (data.items.length === 0) {
            // TODO: change for pop up notification
            window.alert('No data found');

            throw new Error('No data found');
          }
          return data.items;
        }),
        map((users) => users.map((user) => user.url)),
        exhaustMap((usersUrls) => {
          const usersDataComplete = usersUrls.map((url) =>
            this.profileService.getUser(url).pipe(take(1))
          );

          return concat(...usersDataComplete);
        }),
        map((users) => {
          usersDataComplete.push(users);

          return usersDataComplete;
        }),
        map((usersMappeds) => usersMappeds)
      );
  }
}
