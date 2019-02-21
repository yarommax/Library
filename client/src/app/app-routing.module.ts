import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AuthorsPageComponent } from './authors-page/authors-page.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { AuthorsFormComponent } from './authors-page/authors-form/authors-form.component';
import { BooksFormComponent } from './books-page/books-form/books-form.component';

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            {path: '', redirectTo: '/login' , pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent}
        ]
    },
    {
        path: '', component: SiteLayoutComponent, canActivate:[AuthGuard], children: [
            {path: 'overview', component: OverviewPageComponent},
            {path: 'authors', component: AuthorsPageComponent},
            {path: 'authors/new', component: AuthorsFormComponent},
            {path: 'authors/:id', component: AuthorsFormComponent},
            {path: 'books', component: BooksPageComponent},
            {path: 'books/new', component: BooksFormComponent},
            {path: 'books/:id', component: BooksFormComponent}
        ]
    }
]


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}