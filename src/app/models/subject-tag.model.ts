import {Reference} from "./reference.model";

export interface SubjectTag extends Reference {
  name: string,
  subjectsCount: number,
}

export interface SubjectTagCreationRequest {
  name: string,
}
