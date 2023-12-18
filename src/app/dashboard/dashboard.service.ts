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
}
