import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: []
})
export class SearchBarComponent {

  @Output()
  queryChange: EventEmitter<string> = new EventEmitter<string>();
}
