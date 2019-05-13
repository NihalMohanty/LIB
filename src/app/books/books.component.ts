import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
//  public MyArrayType = Array<{id: number, text: string}>();

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  url: string;
  addBooks() {
    // this.router.navigate(['addbooks'], {relativeTo: this.route});
    this.router.navigate(['addbooks']);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    // console.log(this.route.snapshot.url);

  }

}
