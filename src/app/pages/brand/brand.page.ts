import {Component, OnInit} from '@angular/core';
import {BrandService} from "../../services/brand.service";
import {Brand} from "../../models/brand.model";
import {SubjectPreview} from "../../models/subject.model";
import {SubjectService} from "../../services/subject.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.page.html',
  styles: []
})
export class BrandPage implements OnInit {

  brandId!: string;
  brand?: Brand;
  subjects: SubjectPreview[] = [];

  constructor(
    private readonly brandService: BrandService,
    private readonly subjectService: SubjectService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.brandId = this.route.snapshot.paramMap.get('brandId')!;
    this.brandService.getById(this.brandId).subscribe(brand => {
      this.brand = brand;
    })
    this.subjectService.getPageByBrand(this.brandId, 0, 20).subscribe(page => {
      this.subjects = page.items;
    })
  }
}
