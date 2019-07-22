import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { Book } from '../../models/book.model';
import { BookIssued } from '../../models/bookIssued.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-issuedbooks',
  templateUrl: './issuedbooks.component.html',
  styleUrls: ['./issuedbooks.component.css']
})
export class IssuedbooksComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  private issuedBooksArrray: Array<any>;
  private issuedBooks: BookIssued[] = new Array;
  private i:number=0;
  dtOptions: DataTables.Settings = {};

  constructor(private bookServiceService:BookServiceService) { }

  returnBook(book:BookIssued)
  {
    console.log(book);
    this.bookServiceService.returnBook(book);   
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
      for (let index = 0; index < this.issuedBooksArrray.length; index++) {
       if(localStorage.getItem("loggedinUserid")===this.issuedBooksArrray[index].user_id && 
       localStorage.getItem("loggedinUser")===this.issuedBooksArrray[index].user_name)
       {
          this.issuedBooks[this.i] = this.issuedBooksArrray[index];
       }
        
      };
      console.log( this.issuedBooks);
    });
  }

}
