import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subj, SubjectPreview} from "../models/subject.model";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private readonly http: HttpClient) {
  }

  queryPreviewsPage(query: string, offset: number, limit: number): Observable<Page<SubjectPreview>> {
    return this.http.get<Page<SubjectPreview>>(`${environment.apiUrl}/subjects`, {
      params: new HttpParams()
        .append('query', query)
        .append('offset', offset.toString())
        .append('limit', limit.toString())
    })
  }


  getById(subjectId: string): Observable<Subj> {
    return this.http.get<Subj>(`${environment.apiUrl}/subjects/${subjectId}`);
  }

  getPageByBrand(brandId: string, offset: number, limit: number): Observable<Page<SubjectPreview>> {
    return this.http.get<Page<SubjectPreview>>(`${environment.apiUrl}/subjects`, {
      params: new HttpParams()
        .append('brandId', brandId)
        .append('offset', offset.toString())
        .append('limit', limit.toString())
    })
  }
}
