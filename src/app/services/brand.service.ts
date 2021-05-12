import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Brand, BrandCreationRequest, BrandPreview} from "../models/brand.model";
import {Reference} from "../models/reference.model";
import {map} from "rxjs/operators";
import {UserRole} from "../models/user.model";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private readonly authService: AuthService, private readonly http: HttpClient) {
  }

  queryPreviewsPage(query: string, offset: number, limit: number): Observable<Page<BrandPreview>> {
    return this.http.get<Page<BrandPreview>>(`${environment.apiUrl}/brands`, {
      params: new HttpParams()
        .append('query', query)
        .append('offset', offset.toString())
        .append('limit', limit.toString())
    })
  }

  getById(brandId: string): Observable<Brand> {
    return this.http.get<Brand>(`${environment.apiUrl}/brands/${brandId}`);
  }

  create(request: BrandCreationRequest): Observable<Brand> {
    return this.http.post<Reference>(`${environment.apiUrl}/brands`, request)
      .pipe(map(ref => ({
        id: ref.id,
        name: request.name,
        description: request.description
      })));
  }

  canCreate(): boolean {
    return this.authService.auth?.role === UserRole.ADMINISTRATOR;
  }
}
