import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-edit-booke',
  templateUrl: './edit-booke.component.html',
  styleUrls: ['./edit-booke.component.css']
})
export class EditBookeComponent implements OnInit {

  private book:Book;
  constructor(private bookServiceService:BookServiceService) { }

  ngOnInit() {
    this.bookServiceService.editBook.subscribe(data => {this.book = data;console.log(this.book)});
  }

  editBook(editBook:Book)
  {
    console.log("*****************");
    console.log(editBook.id);
    console.log("#############");
    console.log(editBook);

    this.bookServiceService.updatePolicy(editBook);
  }
}
