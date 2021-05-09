import {Component, Input} from '@angular/core';
import {BrandPreview} from "../../models/brand.model";

@Component({
  selector: 'app-brand-search-result-item',
  templateUrl: './brand-search-result-item.component.html',
  styles: []
})
export class BrandSearchResultItemComponent {

  @Input()
  brand!: BrandPreview;
}
