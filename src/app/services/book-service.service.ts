import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { BookIssued } from '../models/bookIssued.model';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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
  private issuedBooksArrray: Array<any>;
  private issuedBooks: BookIssued[] = new Array;
  booksaved = false;
  private i = 0;

  constructor(private http: HttpClient, private firestore: AngularFirestore, private firebase: AngularFireDatabase) { }

  addBook(book: Book) {
    console.log(book);
    // this.booksArray.push(book);
    //  return this.http.post('https://librarydb-c31d3.firebaseio.com/books.json',book);
    return this.firestore.collection('books').add(book);
  }

  returnBook(book: BookIssued, bookList: Book[], issuedBookList: BookIssued[]) {
    // book.returnDate = new Date();
    // book.status = "returned";
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIII");
    console.log(book);
    console.log("NBBBBBBBBBBBBBOOOOOOOOOOOOOOOOOOKKKKKKKKKKKKKKLLLLLLLLLLIIISSSSSSSSTTTTTT");
    console.log(bookList);

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < bookList.length; index++) {
      if (book.book_id === bookList[index].id
        && book.book_name === bookList[index].book_Name) {
        console.log("(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((");
        console.log(bookList[index]);

        bookList[index].quantity = bookList[index].quantity + 1;
        console.log("UPDATED BOOK++++++++++++++++++++++++++++++++++");
        console.log(bookList[index]);
        this.updatePolicy(bookList[index]);
      }

    }

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < issuedBookList.length; index++) {
      if (book.id === issuedBookList[index].id
        && book.book_name === issuedBookList[index].book_name
        && book.issueDate === issuedBookList[index].issueDate) {
        console.log("UPDATED ISSUED BOOKK");
        console.log(issuedBookList[index]);
        this.firestore.collection('issuedbooks').doc(book.id).delete();
      }
    }
    console.log("**********************");


    // this.firestore.collection('issuedbooks').doc(book.id).update(book);
    // this.getBooks().subscribe(data => {
    //   this.booksArrray = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as Book;
    //   });

    //   for (let index = 0; index < this.booksArrray.length; index++) {
    //    if(this.booksArrray[index].id===book.book_id)
    //     {
    //       this.booksArrray[index].quantity=this.booksArrray[index].quantity+1;
    //       console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^");
    //       this.booksupdated = this.booksArrray[index];
    //       this.bookid = this.booksArrray[index].id;
    //       console.log(this.booksupdated);
    //       break;
    //     }
    //   }
    // this.firestore.collection('books').doc(this.bookid).update(this.booksupdated);

    // });
    // this.firestore.collection('books').doc(this.bookid).update(this.booksupdated);

  }

  issuedBookList() {
    return this.firestore.collection('issuedbooks').snapshotChanges();
  }

  IssueBooks(book: Book) {

    book.quantity = book.quantity - 1;
    console.log(book.quantity);
    this.bookIssue.book_id = book.id;
    this.bookIssue.book_name = book.book_Name;
    this.bookIssue.user_id = localStorage.getItem("loggedinUserid");
    this.bookIssue.user_name = localStorage.getItem("loggedinUser");
    this.bookIssue.issueDate = new Date();
    this.bookIssue.status = "issued";
    this.issuedbooks = JSON.parse(JSON.stringify(this.bookIssue));
    this.firestore.collection('issuedbooks').add(this.issuedbooks);
    console.log(book);
    console.log("QUANTITY____________________________");
    console.log(book.quantity);
    this.firestore.collection('books').doc(book.id).update(book);
  }

  updatePolicy(book: Book) {
    // delete book.id;
    //return this.firestore.doc('books/' + book.id).update(book);
    console.log(">>>>>>>>>>>>>>>>>>");
    console.log(book);
    this.firestore.collection('books').doc(book.id).update(book);
  }

  sendBooktoOtherComponent(book: Book) {
    this.messageSource.next(book);
  }

  sendBookstoOtherComponent(book) {
    console.log("BOOK VALUES 0");
    console.log(book);
    this.messageSource2.next(book);
  }

  deleteBooks(book) {
    console.log(book.id);
    // return this.firestore.collection('books').doc(book.author).delete();
    return this.firestore.collection('books').doc(book.id).delete();
  }

  getBooks() {

    // this.bookList = this.firebase.list('books');
    console.log(this.firestore.collection('books').snapshotChanges());
    return this.firestore.collection('books').snapshotChanges();
    // return this.bookList;

    // return this.http.get('https://librarydb-c31d3.firebaseio.com/books.json');
    // .pipe(map(
    //   (response:Response) => {
    //     const data = response.json();
    //     return data;
    //   }
    // ));
  }
}
