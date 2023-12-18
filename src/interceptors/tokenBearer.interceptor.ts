import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, take, exhaustMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenInterceptor implements HttpInterceptor {
  private TOKEN = enviroment.access_token;
  private URL_API: string = enviroment.api_url;
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
      url: req.url.includes('https://api.github.com/')
        ? req.url
        : `${this.URL_API}${req.url}`,
      setHeaders: { Authorization: `Bearer ${this.TOKEN}` },
    });

    return next.handle(modifiedRequest);
  }
}
