import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [
  ]
})
export class WelcomeComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthService,
  ) {
  }

  ngOnInit() {
    if (this.authenticationService.auth) {
      this.router.navigate(['/']);
    }
  }

  onSignIn() {
    const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.router.navigate([returnUrl]);
  }
}
