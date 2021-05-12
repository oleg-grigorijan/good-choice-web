import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Brand} from "../../models/brand.model";
import {BrandService} from "../../services/brand.service";

@Component({
  selector: 'app-brand-creation-form',
  templateUrl: './brand-creation-form.component.html',
  styles: []
})
export class BrandCreationFormComponent implements OnInit {

  @Output()
  creation: EventEmitter<Brand> = new EventEmitter<Brand>();

  form: FormGroup;

  wasSubmitted: boolean = false;
  isLoading: boolean = false;
  formError: string | null = null;

  constructor(
    private readonly brandService: BrandService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
  }

  onSubmitClick(): void {
    this.wasSubmitted = true;
    this.formError = null;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.brandService.create({
      name: this.form.controls.name.value,
      description: this.form.controls.description.value,
    }).subscribe(brand => {
      this.creation.emit(brand);
      this.form.reset();
      this.wasSubmitted = false;
      this.isLoading = false;
    }, error => {
      this.formError = 'common.error.unexpected';
      this.isLoading = false;
    });
  }
}
