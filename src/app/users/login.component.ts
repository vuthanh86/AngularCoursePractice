import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../messages/message.service';

import { AuthService } from './auth.service';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService,
    private messageService: MessageService,
    private route : Router) { }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      const isSuccess = this.authService.login(userName, password);
      if (isSuccess) {
        this.route.navigateByUrl('/wellcome');
      } else {
        this.errorMessage = this.messageService.messages[0];
      }
      // Navigate to the Product List page after log in.
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
