import {Component, Input} from '@angular/core';
import {SubjectPreview} from "../../models/subject.model";
import {BrandPreview} from "../../models/brand.model";
import {SubjectTag} from "../../models/subject-tag.model";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styles: []
})
export class SearchResultComponent {

  @Input() subjectTags?: SubjectTag[];
  @Input() brands?: BrandPreview[];
  @Input() subjects?: SubjectPreview[];
}
