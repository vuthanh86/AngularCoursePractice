import { Component, OnInit } from '@angular/core';

import { AuthService } from './users/auth.service';
import { setTheme } from 'ngx-bootstrap/utils';
import { CartService } from './cart/cart.service';
import { CartItem } from './cart/cart-item';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Product Management';
  cardItems: CartItem[] = [];
  totalItemInCart = 0;

  constructor(private authService: AuthService,
              private cartService: CartService) {
    setTheme('bs4');
  }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: carts => {
        this.cardItems = carts;
        this.totalItemInCart = this.cardItems.length;
      }
    })
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }
  logOut(): void {
    this.authService.logout();
    console.log('Log out');
  }
}
