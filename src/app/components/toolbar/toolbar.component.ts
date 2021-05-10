import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: []
})
export class ToolbarComponent {

  constructor(readonly authService: AuthService) {
  }

  onSignOutClick(): void {
    this.authService.signOut();
  }
}
