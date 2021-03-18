import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  template: `<div><h3>Good Bye</h3></div>`
})
export class LogoutComponent {
  constructor(private authService: AuthService,
    private route: Router) {  }

  logout(): void {
    this.authService.logout();
    this.route.navigateByUrl('/wellcome');
  }
}
