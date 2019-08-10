import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BookServiceService } from '../services/book-service.service';
import { HttpResponse } from '@angular/common/http';
import { BookIssued } from '../models/bookIssued.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnDestroy, OnInit {
  //  public MyArrayType = Array<{id: number, text: string}>();
  // dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  private loggedinUserRole;
  private isAdmin;
  private books: Book[] = new Array<any>();
  private booksArrray: Array<any>;
  private issuedBooks: BookIssued[] = new Array<any>();
  private i = 0;
  private issuedBooksArrray: Array<any>;
  arr: Array<{ id: number, text: string }> = [
    { id: 1, text: 'Sentence 1' },
    { id: 2, text: 'Sentence 2' },
    { id: 3, text: 'Sentence 3' },
    { id: 4, text: 'Sentenc4 ' },
  ];

  constructor(private router: Router, private route: ActivatedRoute, private bookServiceService: BookServiceService) {
  }

  url: string;
  addBooks() {
    this.router.navigate(['addbooks']);
  }

  editBooks(book: Book) {
    this.bookServiceService.sendBooktoOtherComponent(book);
    this.router.navigate(['editbook']);
  }

  update(book: Book) {
    console.log(book.id);
    this.bookServiceService.updatePolicy(book);
  }

  deleteBooks(book) {
    this.bookServiceService.deleteBooks(book);
  }
  IssueBooks(book: Book) {
    console.log(book);
    if (book.quantity > 0) {
      this.bookServiceService.IssueBooks(book);
    } else {
      alert('Sorry this book is currently not available');
    }
  }

  issuedBookList() {

    this.router.navigate(['issuedbooks']);
    // this.bookServiceService.issuedBookList().subscribe(data => {
    //   this.issuedBooksArrray = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as Book;
    //   });
    //   for (let index = 0; index < this.issuedBooksArrray.length; index++) {
    //    if(localStorage.getItem("loggedinUserid")===this.issuedBooksArrray[index].user_id &&
    //    localStorage.getItem("loggedinUser")===this.issuedBooksArrray[index].user_name)
    //    {
    //       this.issuedBooks[this.i] = this.issuedBooksArrray[index];
    //    }
    //   };
    //   console.log( this.issuedBooks);
    // });
  }

  ngOnInit() {
    this.loggedinUserRole = localStorage.getItem('loggedinUserRole');
    if (this.loggedinUserRole === 'user') {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
      console.log(this.loggedinUserRole);
      // this.dtOptions = {
      //   pagingType: 'full_numbers',
      //   pageLength: 10
      // };
    }
    // console.log(this.route.snapshot.url);
    //   this.bookServiceService.getBooks().subscribe(
    //     (allBooks) => {
    //       // console.log('Observer got a next value: ' ),
    //     //  this.books=allBooks;
    //     console.log(allBooks)
    //   // this.booksArrray = Array.of(this.books);
    //       // console.log(this.booksArrray);
    //       console.log(this.booksArrray);
    // },
    //     err => {console.error('Observer got an error: ' + err)},
    //   )

    // this.bookServiceService.getBooks().subscribe(data => {
    //   this.booksArrray = data
    // });

    this.bookServiceService.getBooks().subscribe(data => {
      this.booksArrray = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Book;
      });
      this.dtTrigger.next();
      //   setTimeout(function() {
      // this.dtTrigger.next();
      // }.bind(this));
    });
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }
}
