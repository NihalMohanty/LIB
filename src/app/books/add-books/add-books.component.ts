import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookServiceService } from '../../services/book-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css']
})
export class AddBooksComponent implements OnInit {

  constructor(private bookServiceService: BookServiceService, private router: Router) { }

  addBook(book: Book) {
    this.bookServiceService.addBook(book);
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
  }

}
