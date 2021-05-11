import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SubjectTag, SubjectTagCreationRequest} from "../models/subject-tag.model";
import {Page} from "../models/page.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Reference} from "../models/reference.model";
import {map} from "rxjs/operators";

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

  create(request: SubjectTagCreationRequest): Observable<SubjectTag> {
    return this.http.post<Reference>(`${environment.apiUrl}/subjects/tags`, request)
      .pipe(map(ref => ({id: ref.id, name: request.name, subjectsCount: 0})));
  }
}
