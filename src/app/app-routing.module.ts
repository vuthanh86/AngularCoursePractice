import { PageNotFoundComponent } from './page-not-found.component';
import { WelcomeComponent } from './home/welcome.component';
import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

const AppRoutes = [
    { path: 'wellcome', component: WelcomeComponent },
    { path: '', redirectTo: 'wellcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(AppRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}