import {Reference} from "./reference.model";

export interface BrandPreview extends Reference {
  name: string,
}

export interface Brand extends Reference {
  name: string,
  description: string,
}
