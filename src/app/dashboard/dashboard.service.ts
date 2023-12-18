import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const result = this.http.get<any>('users').pipe(map((data) => data));

    return result;
  }

  findUsers(username: string): Observable<User[]> {
    // TODO create interface for set on the get<any> for the any, to hace the data mapped
    //should be
    /*
    {total_count: number
     incomplete_results: boolean,
    items: User[]
    } */
    const result = this.http
      .get<any>(`search/users?q=${username} in:login`)
      .pipe(map((data) => data.items));
    return result;
  }
}
