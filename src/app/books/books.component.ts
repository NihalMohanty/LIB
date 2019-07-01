import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BookServiceService } from '../services/book-service.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
    private books: Book[] = new Array<any>();
    private booksArrray: Array<any>;
   arr: Array<{id: number, text: string}> = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc4 '},
];
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private route: ActivatedRoute, private bookServiceService: BookServiceService) { }

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

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.bookServiceService.getBooks().subscribe(data => {
    this.booksArrray = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...e.payload.doc.data()
      } as Book;
    });
  });
}
}
