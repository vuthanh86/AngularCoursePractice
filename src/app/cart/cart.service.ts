import { Injectable } from '@angular/core';
import { CartItem } from './cart-item';
import { AddToCartResult } from './add-item-result';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cardItems: CartItem[] = [];

  getCartItems() : Observable<CartItem[]> {
    const items = of(this.cardItems);
    return items;
  }

  addItemToCart(productCode: string, quantity: number): AddToCartResult {
    if (!productCode || quantity <= 0) {
      return { status: false, message: 'Add item:' + productCode + ' to cart failed.', totalItem: 0 };
    }

    let existingItem = this.filterExistingItem(productCode);

    if (existingItem) {
      existingItem.quantity += 1;
      const itemIdx = this.cardItems.indexOf(existingItem);
      if (itemIdx !== -1) {
        this.cardItems[itemIdx] = existingItem;
      }
    } else {
      existingItem = { productId: productCode, quantity: 1, user: 'test' };
      this.cardItems.push(existingItem);
    }
    const addResult = { status: true, message: 'Add item:' + productCode + ' to cart was success.', totalItem: this.cardItems.length }
    console.log('CardService: addItemToCard sucess. Item value: ' + JSON.stringify(addResult));
    return addResult;
  }

  filterExistingItem(productCode: string): CartItem {
    const initCartItem = { productId: productCode, quantity: 1, user: 'test' };
    if (!this.cardItems) {
      return null;
    }

    const code = productCode.toLocaleLowerCase();
    const filtered = this.cardItems.find((item: CartItem) =>
      item.productId.toLocaleLowerCase().indexOf(code) !== -1);

    if (!filtered) {
      return null;
    }
    return filtered;
  }
}
