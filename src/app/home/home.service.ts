import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../interfaces/user';
import { Octokit } from 'octokit';
import { FindUsers } from '../../interfaces/responsesInterfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const result = this.http.get<User[]>('users').pipe(map((data) => data));

    return result;
  }

  findUsers(username: string, pageNumber: number = 1): Observable<User[]> {
    const result = this.http
      .get<FindUsers>(
        `search/users?q=${username}+in:login&per_page=10&page=${pageNumber}`
      )
      .pipe(
        map((data) => {
          if (data.items.length == 0) {
            // TODO change for pop up notification
            window.alert('No data found');
          }
          return data.items;
        })
      );

    return result;
  }
}
