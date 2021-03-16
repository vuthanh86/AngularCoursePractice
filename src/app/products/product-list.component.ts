import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Product } from './product';
import { ProductService } from './product.service';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  // imageHeight = 35;
  imageMargin = 2;
  showImage = true;
  errorMessage = '';
  addCartMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  handleAddToCart(product: Product): void {
    console.log(product);
    const addCartRes = this.cartService.addItemToCart(product.productCode, 1);
    if (!addCartRes) {
      this.errorMessage = 'Add to shopping cart failed';
      return;
    }
    this.addCartMessage = 'Item ' + product.productName + ' was added to shopping cart.';
  }
}
