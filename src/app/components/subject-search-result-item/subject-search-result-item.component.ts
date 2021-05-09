import {Component, Input} from '@angular/core';
import {SubjectPreview} from "../../models/subject.model";

@Component({
  selector: 'app-subject-search-result-item',
  templateUrl: './subject-search-result-item.component.html',
  styles: []
})
export class SubjectSearchResultItemComponent {

  @Input()
  subject!: SubjectPreview;
}
