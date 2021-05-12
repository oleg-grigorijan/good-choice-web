import {Reference} from "./reference.model";
import {BrandPreview} from "./brand.model";
import {SubjectTag} from "./subject-tag.model";
import {ImageDescriptor} from "./image-descriptor.model";

export interface SubjectSummary {
  marks: { value: number, count: number }[],
  reviewsCount: number,
  averageMark: number,
}

export interface SubjectPreview extends Reference {
  name: string,
  brand: BrandPreview,
  summary: SubjectSummary,
  subjectTags: SubjectTag[], // TODO: Rename to tags
  primaryImage: ImageDescriptor,
}

export interface Subj extends Reference {
  name: string,
  description: string,
  brand: BrandPreview,
  summary: SubjectSummary,
  subjectTags: SubjectTag[], // TODO: Rename to tags
  primaryImage: ImageDescriptor,
  images: ImageDescriptor[],
}

export interface SubjectCreationRequest {
  name: string,
  description: string,
  brand: Reference,
  addedTags: Reference[],
  images: Reference[],
  primaryImage: Reference | null,
}
