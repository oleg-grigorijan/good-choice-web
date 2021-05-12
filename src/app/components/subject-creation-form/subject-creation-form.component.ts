import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Reference} from "../../models/reference.model";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../services/subject.service";
import {BrandPreview} from "../../models/brand.model";
import {BrandService} from "../../services/brand.service";
import {SubjectTag} from "../../models/subject-tag.model";
import {SubjectTagService} from "../../services/subject-tag.service";
import {ImageService} from "../../services/image.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-subject-creation-form',
  templateUrl: './subject-creation-form.component.html',
  styles: []
})
export class SubjectCreationFormComponent implements OnInit {

  @Output()
  creation: EventEmitter<Reference> = new EventEmitter<Reference>();

  form: FormGroup;
  brand: BrandPreview | null = null;
  tags: SubjectTag[] = [];

  brandsSearchResult: BrandPreview[] = [];
  tagsSearchResult: SubjectTag[] = [];

  wasSubmitted: boolean = false;
  isLoading: boolean = false;
  formError: string | null = null;

  constructor(
    private readonly subjectService: SubjectService,
    private readonly brandService: BrandService,
    private readonly tagService: SubjectTagService,
    private readonly imageService: ImageService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      imageUrls: this.formBuilder.array(['']),
    });
  }

  ngOnInit(): void {
  }

  get imageUrls(): FormArray {
    return this.form.controls.imageUrls as FormArray;
  }

  onSubmitClick(): void {
    this.wasSubmitted = true;
    this.formError = null;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;


    this.imageService.uploadAll(this.imageUrls.controls.filter(it => it.value).map(it => ({location: it.value})))
      .pipe(switchMap(images => this.subjectService.create({
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        addedTags: this.tags.map(it => ({id: it.id})),
        brand: {id: this.brand!.id},
        images: images,
        primaryImage: images[0],
      })))
      .subscribe(ref => {
        this.creation.emit(ref);
        this.form.reset();
        this.wasSubmitted = false;
        this.isLoading = false;
      }, error => {
        this.formError = 'common.error.unexpected';
        this.isLoading = false;
      })
  }

  asFormControl(it: AbstractControl): FormControl {
    return it as FormControl;
  }

  onBrandQueryChange(query: string): void {
    this.brandService.queryPreviewsPage(query, 0, 5).subscribe(page => {
      this.brandsSearchResult = page.items;
    })
  }

  selectBrand(brand: BrandPreview): void {
    this.brand = brand;
  }

  onTagQueryChange(query: string): void {
    this.tagService.queryPage(query, 0, 5).subscribe(page => {
      this.tagsSearchResult = page.items;
    })
  }

  isTagSelected(tag: SubjectTag): boolean {
    return this.tags.find(it => it.id === tag.id) !== undefined;
  }

  selectTag(tag: SubjectTag): void {
    if (!this.isTagSelected(tag)) {
      this.tags.push(tag);
    }
  }

  addImage(): void {
    this.imageUrls.push(this.formBuilder.control(''));
  }
}
