import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review} from "../models/review.model";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private readonly http: HttpClient) {
  }

  getPageBySubject(subjectId: string, offset: number, limit: number): Observable<Page<Review>> {
    return this.http.get<Page<Review>>(`${environment.apiUrl}/subjects/${subjectId}/reviews`, {
      params: new HttpParams()
        .append('offset', offset.toString())
        .append('limit', limit.toString())
    });
  }
}
