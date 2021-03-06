import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styles: []
})
export class SignInFormComponent implements OnInit {

  @Output()
  signIn: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  isLoading = false;
  wasSubmitted = false;
  isInvalidCredentialsError = false;

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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
    this.authService.signIn({
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    }).subscribe(() => {
      this.signIn.emit();
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
