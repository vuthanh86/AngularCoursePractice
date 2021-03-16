import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
import { ProductModule } from './products/product.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { CartComponent } from './cart/cart.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(en);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    ProductModule,
    UserModule,
    MessageModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    CartComponent
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class AppModule { }
