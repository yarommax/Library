import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from 'src/app/shared/services/books.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Book } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent implements OnInit {

  isNew = true
  form: FormGroup
  book: Book

  constructor(private route: ActivatedRoute,
    private bookService: BooksService,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name : new FormControl(null, Validators.required),
      publishing : new FormControl(null),
      ebook : new FormControl(false),
      year : new FormControl(null),
      isbn : new FormControl(null),
      pages : new FormControl(null)
    })
    this.form.disable()

    //как только прочитаю метод params - хочу выполнить след стрим pipe
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if(params['id']) {
              this.isNew = false
              return this.bookService.getBookById(params['id'])
            } 
              //если не выолнился блок возвратим что-нибудь
              return of (null)
          }
        )
      )
      .subscribe(
        book => {
          if(book){
            //занесем в переменную информацию о авторе(для получения айди)
            this.book = book
            //меняем пустые поля формы на те, что пришли с сервера
            this.form.patchValue({
              name: book.name,
              publishing: book.publishing,
              ebook : book.ebook,
              year : book.year,
              isbn : book.isbn,
              pages : book.pages
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }
  onSubmit() {
    let obs$

    this.form.disable()

    
    if(this.isNew) {
      obs$ = this.bookService.createBook(this.form.value.name,this.form.value.publishing,this.form.value.ebook,this.form.value.year,this.form.value.isbn,this.form.value.pages)
    } else {
      obs$ = this.bookService.updateBook(this.book._id , this.form.value.name,this.form.value.publishing,this.form.value.ebook,this.form.value.year,this.form.value.isbn,this.form.value.pages)
    }
    
    obs$.subscribe(
      //success callback
      book => {
        this.book = book
        MaterialService.toast('Saved')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()        
      }
    )
  }

  deleteBook() {
    this.bookService.delete(this.book._id).subscribe(
      responce => MaterialService.toast(responce.message),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()        
      },
      () => this.router.navigate(['/books'])
    )
  }

}
