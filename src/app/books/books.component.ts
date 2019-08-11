import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BookServiceService } from '../services/book-service.service';
import { BookIssued } from '../models/bookIssued.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  flag = 0;
  private loggedinUserRole;
  private isAdmin;
  private books: Book[] = new Array<any>();
  private booksArrray: Array<any>;
  private issuedBooks: BookIssued[] = new Array<any>();
  private i = 0;
  private issuedBooksArrray: Array<any>;
  private issuedbooks: BookIssued[] = new Array<any>();
  flag1 = 0;
  arr: Array<{ id: number, text: string }> = [
    { id: 1, text: 'Sentence 1' },
    { id: 2, text: 'Sentence 2' },
    { id: 3, text: 'Sentence 3' },
    { id: 4, text: 'Sentenc4 ' },
  ];

  constructor(private router: Router, private route: ActivatedRoute, private bookServiceService: BookServiceService) {

  }

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

    if (book.quantity > 0) {
      this.bookServiceService.IssueBooks(book);
      window.alert('Have a great time reading this book!!');
    } else { window.alert('Opps! This book is not currently availble!'); }

  }

  issuedBookList() {

    this.bookServiceService.sendBookstoOtherComponent(this.booksArrray);
    this.router.navigate(['/issuedbooks']);
  }

  ngOnInit() {
    this.loggedinUserRole = localStorage.getItem('loggedinUserRole');
    if (this.loggedinUserRole === 'user') {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
      console.log(this.loggedinUserRole);
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
    }

    this.bookServiceService.getBooks().subscribe(data => {
      this.booksArrray = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Book;
      });
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
