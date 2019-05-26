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
//  public MyArrayType = Array<{id: number, text: string}>();
    private books:Book[] = new Array;
    private booksArrray: Array<any>;
   arr: Array<{id: number, text: string}> = [
    {id: 1, text: 'Sentence 1'},
    {id: 2, text: 'Sentence 2'},
    {id: 3, text: 'Sentence 3'},
    {id: 4, text: 'Sentenc4 '},
];
  dtOptions: DataTables.Settings = {};
  // persons: Person[] = [];
  // // We use this trigger because fetching the list of persons can be quite long,
  // // thus we ensure the data is fetched before rendering
  // dtTrigger: Subject = new Subject();

  constructor(private router: Router, private route: ActivatedRoute,private bookServiceService:BookServiceService) { }

  url: string;
  addBooks() {
    // this.router.navigate(['addbooks'], {relativeTo: this.route});
    this.router.navigate(['addbooks']);
  }

  editBooks(book:Book){
    this.bookServiceService.sendBooktoOtherComponent(book);
    this.router.navigate(['editbook']);
  }

  update(book: Book) {
    console.log(book.id);
    this.bookServiceService.updatePolicy(book);
  }

  deleteBooks(book){
    this.bookServiceService.deleteBooks(book);
    // .then(
    //   res => {
    //     console.log("Success");
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
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
    })
  });
}

  }

// }
