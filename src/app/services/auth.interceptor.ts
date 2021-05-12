import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = this.authService.auth;
    if (auth) {
      const headerValue = 'Basic ' + window.btoa(`${auth.email}:${auth.password}`);
      request = request.clone({setHeaders: {Authorization: headerValue}});
    }

    return next.handle(request).pipe(tap(
      () => {
      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authService.signOut();
          this.router.navigate(['/', 'welcome']);
        }
      }
    ));
  }
}
