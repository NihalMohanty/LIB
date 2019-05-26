import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private booksArray: Book[] = new Array;
  private bookList: AngularFireList<any>;
  private messageSource = new BehaviorSubject<Book>(new Book());
  editBook = this.messageSource.asObservable();

  constructor(private http:HttpClient,private firestore: AngularFirestore,private firebase:AngularFireDatabase) { }

  addBook(book:Book)
  {
    console.log(book);
    // this.booksArray.push(book);
  //  return this.http.post('https://librarydb-c31d3.firebaseio.com/books.json',book);
   return this.firestore.collection('books').add(book);
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

  getBooks(){

    // this.bookList = this.firebase.list('books');
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
