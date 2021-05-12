import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageDescriptor, ImageUploadRequest} from "../models/image-descriptor.model";
import {forkJoin, Observable, of} from "rxjs";
import {Reference} from "../models/reference.model";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private readonly http: HttpClient) {
  }

  uploadAll(requests: ImageUploadRequest[]): Observable<ImageDescriptor[]> {
    return requests.length
      ? forkJoin(requests.map(it => this.upload(it)))
      : of([]);
  }

  upload(request: ImageUploadRequest): Observable<ImageDescriptor> {
    return this.http.post<Reference>(`${environment.apiUrl}/images`, request)
      .pipe(map(ref => ({
        id: ref.id,
        location: request.location
      })));
  }
}
