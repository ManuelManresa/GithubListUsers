import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../interfaces/user';
import {
  GeneralCommitsUser,
  RepositoriesUser,
} from '../../interfaces/responsesInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUser(url: string): Observable<User> {
    return this.http.get<User>(url).pipe(map((data) => data));
  }

  getRepos(url: string): Observable<RepositoriesUser[]> {
    return this.http
      .get<RepositoriesUser[]>(url + '?q=per_page=10&page=0')
      .pipe(map((data) => data));
  }

  getCommits(url: string): Observable<GeneralCommitsUser[]> {
    const generalCommitsURL = url.split('{/sha}')[0];
    return this.http
      .get<GeneralCommitsUser[]>(generalCommitsURL + '?q=per_page=10&page=0')
      .pipe(map((data) => data));
  }
}
