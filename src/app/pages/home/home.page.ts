import {Component, OnInit} from '@angular/core';
import {SubjectPreview} from "../../models/subject.model";
import {SubjectTag} from "../../models/subject-tag.model";
import {Brand, BrandPreview} from "../../models/brand.model";
import {SubjectService} from "../../services/subject.service";
import {SubjectTagService} from "../../services/subject-tag.service";
import {BrandService} from "../../services/brand.service";
import {Reference} from "../../models/reference.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styles: []
})
export class HomePage implements OnInit {

  query: string = "";
  subjects: SubjectPreview[] = [];
  subjectTags: SubjectTag[] = [];
  brands: BrandPreview[] = [];

  constructor(
    private readonly subjectService: SubjectService,
    private readonly subjectTagService: SubjectTagService,
    private readonly brandService: BrandService,
  ) {
  }

  ngOnInit(): void {
    this.search(this.query);
  }

  search(query: string) {
    this.subjectTagService.queryPage(query, 0, 5).subscribe(page => {
      this.subjectTags = page.items;
    });
    this.brandService.queryPreviewsPage(query, 0, 5).subscribe(page => {
      this.brands = page.items;
    });
    this.subjectService.queryPreviewsPage(query, 0, 20).subscribe(page => {
      this.subjects = page.items;
      // TODO: Pagination
    });
    this.query = query;
  }

  onCreateTagClick(): void {
    this.subjectTagService.create({name: this.query}).subscribe(tag => {
      this.subjectTags.unshift(tag);
    });
  }

  onBrandCreation(brand: Brand): void {
    this.brands.unshift(brand);
  }

  onSubjectCreation(ref: Reference): void {
  }
}
