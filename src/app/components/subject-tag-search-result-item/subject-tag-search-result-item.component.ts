import {Component, Input} from '@angular/core';
import {SubjectTag} from "../../models/subject-tag.model";

@Component({
  selector: 'app-subject-tag-search-result-item',
  templateUrl: './subject-tag-search-result-item.component.html',
  styles: []
})
export class SubjectTagSearchResultItemComponent {

  @Input()
  tag!: SubjectTag;
}
