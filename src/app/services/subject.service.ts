import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subj, SubjectCreationRequest, SubjectPreview} from "../models/subject.model";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";
import {Reference} from "../models/reference.model";
import {AuthService} from "./auth.service";
import {UserRole} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private readonly authService: AuthService, private readonly http: HttpClient) {
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

  create(request: SubjectCreationRequest): Observable<Reference> {
    return this.http.post<Reference>(`${environment.apiUrl}/subjects`, request);
  }

  canCreate(): boolean {
    return this.authService.auth?.role === UserRole.ADMINISTRATOR;
  }
}
