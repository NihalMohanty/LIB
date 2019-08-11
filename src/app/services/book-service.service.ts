import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { BookIssued } from '../models/bookIssued.model';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private booksArrray: Array<any>;
  private bookList: AngularFireList<any>;
  private bookIssue = new BookIssued();
  private booksupdated;
  private issuedbooks;
  private bookid;
  private messageSource = new BehaviorSubject<Book>(new Book());
  editBook = this.messageSource.asObservable();
  private messageSource2 = new BehaviorSubject<Book[]>(Array<Book>());
  AllbookList = this.messageSource2.asObservable();
  booksaved = false;
  private i = 0;

  constructor(private http: HttpClient, private firestore: AngularFirestore, private firebase: AngularFireDatabase) { }

  addBook(book: Book) {
    return this.firestore.collection('books').add(book);
  }

  returnBook(book: BookIssued, bookList: Book[], issuedBookList: BookIssued[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < bookList.length; index++) {
      if (book.book_id === bookList[index].id
        && book.book_name === bookList[index].book_Name) {
        bookList[index].quantity = bookList[index].quantity + 1;
        this.updatePolicy(bookList[index]);
      }

    }

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < issuedBookList.length; index++) {
      if (book.id === issuedBookList[index].id
        && book.book_name === issuedBookList[index].book_name
        && book.issueDate === issuedBookList[index].issueDate) {
        this.firestore.collection('issuedbooks').doc(book.id).delete();
      }
    }
  }

  issuedBookList() {
    return this.firestore.collection('issuedbooks').snapshotChanges();
  }

  IssueBooks(book: Book) {

    book.quantity = book.quantity - 1;
    console.log(book.quantity);
    this.bookIssue.book_id = book.id;
    this.bookIssue.book_name = book.book_Name;
    this.bookIssue.user_id = localStorage.getItem('loggedinUserid');
    this.bookIssue.user_name = localStorage.getItem('loggedinUser');
    this.bookIssue.issueDate = new Date();
    this.bookIssue.status = 'issued';
    this.issuedbooks = JSON.parse(JSON.stringify(this.bookIssue));
    this.firestore.collection('issuedbooks').add(this.issuedbooks);
    this.firestore.collection('books').doc(book.id).update(book);
  }

  updatePolicy(book: Book) {
    this.firestore.collection('books').doc(book.id).update(book);
  }

  sendBooktoOtherComponent(book: Book) {
    this.messageSource.next(book);
  }

  sendBookstoOtherComponent(book) {
    this.messageSource2.next(book);
  }

  deleteBooks(book) {
    return this.firestore.collection('books').doc(book.id).delete();
  }

  getBooks() {
    return this.firestore.collection('books').snapshotChanges();
  }
}
