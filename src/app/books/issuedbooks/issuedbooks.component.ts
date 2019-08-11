import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { Book } from '../../models/book.model';
import { BookIssued } from '../../models/bookIssued.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issuedbooks',
  templateUrl: './issuedbooks.component.html',
  styleUrls: ['./issuedbooks.component.css']
})
export class IssuedbooksComponent implements OnInit, OnDestroy {
  dtTrigger: Subject<any> = new Subject();
  private issuedBooksArrray: Array<any>;
  private issuedBooks: BookIssued[] = new Array<any>();
  private bookList: Book[] = new Array<any>();
  private i = 0;
  @Input() dummycall: Book[] = new Array<Book>();
  dtOptions: DataTables.Settings = {};

  constructor(private bookServiceService: BookServiceService, private router: Router) {
    this.bookServiceService.AllbookList.subscribe(data => { this.bookList = data; console.log(this.bookList); });
  }


  returnBook(book: BookIssued) {
    this.bookServiceService.returnBook(book, this.bookList, this.issuedBooks);
    window.alert('You have successfully returned the book!');
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.bookServiceService.issuedBookList().subscribe(data => {
      this.issuedBooksArrray = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Book;
      });
      this.dtTrigger.next();
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < this.issuedBooksArrray.length; index++) {
        if (localStorage.getItem('loggedinUserid') === this.issuedBooksArrray[index].user_id &&
          localStorage.getItem('loggedinUser') === this.issuedBooksArrray[index].user_name &&
          this.issuedBooksArrray[index].status !== 'returned') {
          this.issuedBooks[this.i] = this.issuedBooksArrray[index];
          console.log(this.issuedBooks[this.i]);
          this.i++;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
