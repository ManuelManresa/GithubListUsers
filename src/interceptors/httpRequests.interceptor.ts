import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments/enviroment';
import { NotificationService } from '../app/notification-pop-up/notification.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  private TOKEN = enviroment.access_token;
  private URL_API: string = enviroment.api_url;
  constructor(private notificationService: NotificationService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
      url: req.url.includes('https://api.github.com/')
        ? req.url
        : `${this.URL_API}${req.url}`,
      setHeaders: req.url.includes('search/users')
        ? { Authorization: `${this.TOKEN}` }
        : {},
    });

    return next.handle(modifiedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err) {
          switch (err.status) {
            default:
              this.notificationService.getNotification(
                `Error Code: ${err.status}, ${err.message}`
              );

              break;
          }
        }
        throw err;
      })
    );
  }
}
