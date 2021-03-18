import { Injectable } from '@angular/core';
import { CartItem } from './cart-item';
import { AddToCartResult } from './add-item-result';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cardItem$ = new BehaviorSubject<CartItem[]>([]);

  getCartItems() : Observable<CartItem[]> {
    return this.cardItem$.asObservable();
  }

  addItemToCart(productCode: string, quantity: number): AddToCartResult {
    if (!productCode || quantity <= 0) {
      return { status: false, message: 'Add item:' + productCode + ' to cart failed.', totalItem: 0 };
    }

    let existingItem = this.filterExistingItem(productCode);

    const cardItems = this.cardItem$.getValue();

    if (existingItem) {
      existingItem.quantity += 1;
      const itemIdx = cardItems.indexOf(existingItem);
      if (itemIdx !== -1) {
        cardItems[itemIdx] = existingItem;
      }
    } else {
      existingItem = { productId: productCode, quantity: 1, user: 'test' };
      cardItems.push(existingItem);
    }
    this.cardItem$.next(cardItems);
    const addResult = { status: true, message: 'Add item:' + productCode + ' to cart was success.', quantity: existingItem.quantity, totalItem: cardItems.length };

    console.log('CardService: addItemToCard sucess. Item value: ' + JSON.stringify(addResult));
    return addResult;
  }

  filterExistingItem(productCode: string): CartItem {

    const cardItems = this.cardItem$.getValue();

    if (!cardItems || cardItems.length == 0) {
      return null;
    }

    const code = productCode.toLocaleLowerCase();
    const filtered = cardItems.find((item: CartItem) =>
      item.productId.toLocaleLowerCase().indexOf(code) !== -1);

    if (!filtered) {
      return null;
    }
    return filtered;
  }
}
