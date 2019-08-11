import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AddBooksComponent } from './books/add-books/add-books.component';
import { EditBookeComponent } from './books/edit-booke/edit-booke.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { IssuedbooksComponent } from './books/issuedbooks/issuedbooks.component';
import { AboutComponent } from './about/about.component';
import { AlwaysAuthGuard, OnlyLoggedInUsersGuard } from './services/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AlwaysAuthGuard, OnlyLoggedInUsersGuard]
  },
  {
    path: 'book',
    component: BooksComponent
  },
  {
    path: 'addbooks',
    component: AddBooksComponent
  },
  {
    path: 'editbook',
    component: EditBookeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'issuedbooks',
    component: IssuedbooksComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
