import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BooksComponent } from './books/books.component';
import { DataTablesModule } from 'angular-datatables';
import { AddBooksComponent } from './books/add-books/add-books.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    BooksComponent,
    AddBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
