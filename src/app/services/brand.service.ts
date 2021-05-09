import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BrandPreview} from "../models/brand.model";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private readonly http: HttpClient) {
  }

  queryPreviewsPage(query: string, offset: number, limit: number): Observable<Page<BrandPreview>> {
    return this.http.get<Page<BrandPreview>>(`${environment.apiUrl}/brands`, {
      params: new HttpParams()
        .append('query', query)
        .append('offset', offset.toString())
        .append('limit', limit.toString())
    })
  }
}
