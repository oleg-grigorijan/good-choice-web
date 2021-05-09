import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SubjectTag} from "../models/subject-tag.model";
import {Page} from "../models/page.model";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubjectTagService {

  constructor(private readonly http: HttpClient) {
  }

  queryPage(query: string, offset: number, limit: number): Observable<Page<SubjectTag>> {
    return this.http.get<Page<SubjectTag>>(`${environment.apiUrl}/subjects/tags`, {
      params: new HttpParams()
        .append('query', query)
        .append('offset', offset.toString())
        .append('limit', limit.toString())
    })
  }
}
