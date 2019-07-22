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
  private bookIssue=new BookIssued();
  private issuedbooks;
  private messageSource = new BehaviorSubject<Book>(new Book());
  editBook = this.messageSource.asObservable();
  private issuedBooksArrray: Array<any>;
  private issuedBooks: BookIssued[] = new Array;
  private i:number=0;

  constructor(private http:HttpClient,private firestore: AngularFirestore,private firebase:AngularFireDatabase) { }

  addBook(book:Book)
  {
    console.log(book);
    // this.booksArray.push(book);
  //  return this.http.post('https://librarydb-c31d3.firebaseio.com/books.json',book);
   return this.firestore.collection('books').add(book);
  }

  returnBook(book: BookIssued)
  {         
    book.returnDate = new Date();
    book.status = "returned";
    this.firestore.collection('issuedbooks').doc(book.id).update(book);
    this.getBooks().subscribe(data => {
      this.booksArrray = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Book;
      });

      for (let index = 0; index < this.booksArrray.length; index++) {
       if(this.booksArrray[index].id===book.book_id)
        {
          this.booksArrray[index].quantity=this.booksArrray[index].quantity+1;
          this.firestore.collection('books').doc(this.booksArrray[index].id).update(book);
        }
      }

    });

         console.log(this.booksArrray);
  }

  issuedBookList()
  {
    return this.firestore.collection('issuedbooks').snapshotChanges();
  }

  IssueBooks(book:Book)
  {
    book.quantity = book.quantity-1;
    this.bookIssue.book_id = book.id;
    console.log( book.id);
    this.bookIssue.book_name = book.book_Name;
    console.log(localStorage.getItem("loggedinUserid"));
    this.bookIssue.user_id = localStorage.getItem("loggedinUserid");
    this.bookIssue.user_name = localStorage.getItem("loggedinUser");
    this.bookIssue.issueDate = new Date();
    this.bookIssue.status = "issued";
    console.log(this.bookIssue);
    console.log(book);
     this.issuedbooks = JSON.parse(JSON.stringify(this.bookIssue));
    this.firestore.collection('issuedbooks').add(this.issuedbooks);
    return this.firestore.collection('books').doc(book.id).update(book);
  }

  updatePolicy(book:Book){
   // delete book.id;
   //return this.firestore.doc('books/' + book.id).update(book);
   console.log(">>>>>>>>>>>>>>>>>>");
   console.log(book.id);
  return this.firestore.collection('books').doc(book.id).update(book);
  }

  sendBooktoOtherComponent(book:Book){
    this.messageSource.next(book);
  }

  deleteBooks(book){
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
