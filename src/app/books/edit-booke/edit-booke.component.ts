import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-booke',
  templateUrl: './edit-booke.component.html',
  styleUrls: ['./edit-booke.component.css']
})
export class EditBookeComponent implements OnInit {

  private book: Book;
  constructor(private bookServiceService: BookServiceService, private router: Router) { }

  ngOnInit() {
    this.bookServiceService.editBook.subscribe(data => {this.book = data; console.log(this.book); });
  }

  editBook(editBook: Book) {
    this.bookServiceService.updatePolicy(editBook);
    this.router.navigate(['/dashboard']);
  }
}
