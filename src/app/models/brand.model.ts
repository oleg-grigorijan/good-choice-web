import {Reference} from "./reference.model";

export interface BrandPreview extends Reference {
  name: string,
}

export interface Brand extends BrandPreview, Reference {
  name: string,
  description: string,
}

export interface BrandCreationRequest {
  name: string,
  description: string,
}
