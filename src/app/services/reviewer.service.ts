import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReviewerRegistrationRequest} from "../models/user.model";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {mergeMap} from "rxjs/operators";
import {Auth} from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {

  constructor(private readonly authService: AuthService, private readonly http: HttpClient) {
  }

  signUp(request: ReviewerRegistrationRequest): Observable<Auth> {
    return this.http.post<void>(`${environment.apiUrl}/reviewers/self`, request)
      .pipe(mergeMap(_ => this.authService.signIn({
        email: request.email,
        password: request.password
      })));
  }
}
