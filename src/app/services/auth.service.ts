import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Auth, Credentials} from "../models/auth.model";
import {UserRole} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly localStorageKey = 'auth';

  auth: Auth | null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    let authJson = localStorage.getItem(this.localStorageKey);
    this.auth = authJson
      ? JSON.parse(authJson)
      : null;
  }

  signIn(credentials: Credentials): Observable<Auth> {
    return this.http.post<{ role: UserRole }>(`${environment.apiUrl}/login`, credentials).pipe(map(it => ({
      email: credentials.email,
      password: credentials.password,
      role: it.role,
    })), tap(auth => {
      this.auth = auth;
      localStorage.setItem(this.localStorageKey, JSON.stringify(auth));
    }));
  }

  signOut(): void {
    this.auth = null;
    localStorage.removeItem(this.localStorageKey);
  }
}
