import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksService } from '../shared/services/books.service';
import { Book } from '../shared/interfaces';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {

  books$ : Observable<Book[]>
  
  constructor(
    private booksService: BooksService
  ) {}

  ngOnInit() {
    this.books$ = this.booksService.fetch()
    console.log(this.books$)
  }
  

}
