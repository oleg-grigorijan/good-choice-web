import {Reference} from "./reference.model";

export interface ImageDescriptor extends Reference {
  location: string,
}

export interface ImageUploadRequest {
  location: string,
}
