import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Reference} from "../../models/reference.model";
import {ReviewService} from "../../services/review.service";

@Component({
  selector: 'app-review-creation-form',
  templateUrl: './review-creation-form.component.html',
  styles: []
})
export class ReviewCreationFormComponent implements OnInit {

  @Input()
  subjectId!: string;

  @Output()
  creation: EventEmitter<Reference> = new EventEmitter<Reference>();

  form: FormGroup;

  wasSubmitted: boolean = false;
  isLoading: boolean = false;
  formError: string | null = null;

  constructor(
    private readonly reviewService: ReviewService,
    private readonly formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      mark: ['5', Validators.required],
      title: ['', Validators.required],
      advantages: this.formBuilder.array([this.formBuilder.control('')]),
      disadvantages: this.formBuilder.array([this.formBuilder.control('')]),
      body: ['', Validators.required],
    });
  }

  get advantages(): FormArray {
    return this.form.controls.advantages as FormArray;
  }

  get disadvantages(): FormArray {
    return this.form.controls.disadvantages as FormArray;
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
    this.reviewService.create({
      subject: {id: this.subjectId},
      mark: Number(this.form.controls.mark.value),
      title: this.form.controls.title.value,
      body: {
        content: this.form.controls.body.value
      },
      advantages: this.advantages.controls.map(it => it.value as string).filter(it => it),
      disadvantages: this.disadvantages.controls.map(it => it.value as string).filter(it => it),
      images: [],
    }).subscribe(ref => {
      this.creation.emit(ref);
      this.form.reset();
      this.wasSubmitted = false;
      this.isLoading = false;
    }, error => {
      this.formError = 'common.error.unexpected';
      this.isLoading = false;
    })
  }

  addAdvantage() {
    this.advantages.push(this.formBuilder.control(''));
  }

  addDisadvantage() {
    this.disadvantages.push(this.formBuilder.control(''));
  }

  asFormControl(it: AbstractControl): FormControl {
    return it as FormControl;
  }
}
