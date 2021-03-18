import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { SharedModule } from '../shared/shared.module';


const AuthRoutes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(AuthRoutes)
  ],
  declarations: [
    LoginComponent,
    LogoutComponent
  ]
})
export class UserModule { }
