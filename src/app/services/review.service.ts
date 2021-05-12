import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review, ReviewCreationRequest, ReviewVotes, ReviewVoteType} from "../models/review.model";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";
import {Reference} from "../models/reference.model";
import {AuthService} from "./auth.service";
import {UserRole} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private readonly authService: AuthService, private readonly http: HttpClient) {
  }

  getOwnBySubject(subjectId: string): Observable<Review> {
    return this.http.get<Review>(`${environment.apiUrl}/subjects/${subjectId}/reviews/own`);
  }

  getPageBySubject(subjectId: string, offset: number, limit: number): Observable<Page<Review>> {
    return this.http.get<Page<Review>>(`${environment.apiUrl}/subjects/${subjectId}/reviews`, {
      params: new HttpParams()
        .append('offset', offset.toString())
        .append('limit', limit.toString())
        .append('filterNotOwn', 'true')
    });
  }

  create(request: ReviewCreationRequest): Observable<Reference> { // TODO: Return Review
    return this.http.post<Reference>(`${environment.apiUrl}/reviews`, request);
  }

  canCreate(): boolean {
    return this.authService.auth?.role === UserRole.REVIEWER;
  }

  vote(reviewId: string, type: ReviewVoteType): Observable<ReviewVotes> {
    return this.http.put<ReviewVotes>(`${environment.apiUrl}/reviews/${reviewId}/votes/own`, {type})
  }

  removeVote(reviewId: string): Observable<ReviewVotes> {
    return this.http.delete<ReviewVotes>(`${environment.apiUrl}/reviews/${reviewId}/votes/own`);
  }

  canVote(): boolean {
    return this.authService.auth !== null;
  }
}
