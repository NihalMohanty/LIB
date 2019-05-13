import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { AddBooksComponent } from './books/add-books/add-books.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'book',
    component: BooksComponent
  },
  {
    path: 'addbooks',
    component: AddBooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
