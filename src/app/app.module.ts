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
import { FormsModule } from '@angular/forms';
import { BookServiceService } from './services/book-service.service';
import { HttpClientModule } from '@angular/common/http';
import { EditBookeComponent } from './books/edit-booke/edit-booke.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { IssuedbooksComponent } from './books/issuedbooks/issuedbooks.component';
import { AboutComponent } from './about/about.component';
import { AlwaysAuthGuard } from './services/auth/auth.service';
import { OnlyLoggedInUsersGuard } from './services/auth/auth.service';
import { DialogComponent } from './home/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    BooksComponent,
    AddBooksComponent,
    EditBookeComponent,
    RegisterComponent,
    LoginComponent,
    IssuedbooksComponent,
    AboutComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
  ],
  providers: [BookServiceService, AngularFirestore, AlwaysAuthGuard, OnlyLoggedInUsersGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
