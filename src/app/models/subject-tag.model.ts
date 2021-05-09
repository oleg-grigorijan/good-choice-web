import {Reference} from "./reference.model";

export interface SubjectTag extends Reference {
  name: string,
  subjectsCount: number,
}
