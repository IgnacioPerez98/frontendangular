import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private cookie:CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.cookie.get('token'); 
      req = req.clone({
        setHeaders: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return next.handle(req)
        .pipe(
          tap((event: HttpEvent<any>) => {
            return event.type;
          })
        )
  }
}
