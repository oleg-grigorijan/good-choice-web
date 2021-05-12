import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {ReviewerService} from "../../services/reviewer.service";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styles: []
})
export class SignUpFormComponent implements OnInit {

  @Output()
  signUp: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  isLoading = false;
  wasSubmitted = false;
  isInvalidCredentialsError = false;

  constructor(private readonly formBuilder: FormBuilder, private readonly reviewerService: ReviewerService) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.isInvalidCredentialsError = false;
    });
  }

  onSubmitClick(): void {
    this.wasSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.reviewerService.signUp({
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    }).subscribe(auth => {
      this.signUp.emit();
      this.form.reset()
      this.wasSubmitted = false
      this.isLoading = false;
    }, error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.isInvalidCredentialsError = true;
        this.isLoading = false;
      } else {
        throwError(error);
      }
    });
  }
}
