import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUser(url: string): Observable<User> {
    const result = this.http.get<any>(url).pipe(map((data) => data));

    return result;
  }
}
