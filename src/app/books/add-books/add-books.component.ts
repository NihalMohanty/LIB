import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookServiceService } from '../../services/book-service.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  constructor(private bookServiceService: BookServiceService) { }

  addBook(book: Book) {
    console.log(book);
    this.bookServiceService.addBook(book);
    // .subscribe(
    //   success => {console.log('Observer got a next value: ' + success),alert("Book Added Successfully")},
    //   err => {console.error('Observer got an error: ' + err),alert("Some error has occured try to add after some time")},
    // );
  }

  ngOnInit() {
  }

}
