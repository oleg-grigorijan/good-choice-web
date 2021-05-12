import {Component, Input, OnInit} from '@angular/core';
import {ImageDescriptor} from "../../models/image-descriptor.model";

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styles: [
  ]
})
export class ImageViewerComponent implements OnInit {

  @Input()
  images!: ImageDescriptor[];

  constructor() {
  }

  ngOnInit(): void {
  }
}
