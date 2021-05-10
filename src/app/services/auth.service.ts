import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

  private readonly localStorageKey = 'basic-token';

  private token: string | null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    this.token = localStorage.getItem(this.localStorageKey);
  }

  get isAuthenticated(): boolean {
    console.info(this.token);
    return this.token !== null;
  }

  signIn(login: string, password: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/login`,
      new HttpParams()
        .append('username', login)
        .append('password', password)
        .toString(), {
        headers: new HttpHeaders()
          .append('Content-Type', 'application/x-www-form-urlencoded')
      }).pipe(tap(() => {
      this.token = window.btoa(`${login}:${password}`);
      localStorage.setItem(this.localStorageKey, this.token);
    }));
  }

  signOut(): void {
    this.token = null;
    localStorage.removeItem(this.localStorageKey);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Hello");
    if (this.isAuthenticated) {
      const headerValue = 'Basic ' + this.token;
      request = request.clone({setHeaders: {Authorization: headerValue}});
    }

    return next.handle(request).pipe(tap(
      () => {
      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.signOut();
          this.router.navigate(['welcome']);
        }
      }
    ));
  }
}
