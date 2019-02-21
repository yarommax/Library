import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorsService } from 'src/app/shared/services/authors.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Author } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-authors-form',
  templateUrl: './authors-form.component.html',
  styleUrls: ['./authors-form.component.css']
})
export class AuthorsFormComponent implements OnInit {

  isNew = true
  form: FormGroup
  author: Author

  constructor(private route: ActivatedRoute,
    private authorService: AuthorsService,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email : new FormControl(null, [Validators.required, Validators.email]),
      firstName : new FormControl(null, Validators.required),
      secondName : new FormControl(null, Validators.required)
    })
    this.form.disable()

    //как только прочитаю метод params - хочу выполнить след стрим pipe
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if(params['id']) {
              this.isNew = false
              return this.authorService.getAuthorById(params['id'])
            } 
              //если не выолнился блок возвратим что-нибудь
              return of (null)
          }
        )
      )
      .subscribe(
        author => {
          if(author){
            //занесем в переменную информацию о авторе(для получения айди)
            this.author = author
            //меняем пустые поля формы на те, что пришли с сервера
            this.form.patchValue({
              email: author.email,
              firstName: author.firstName,
              secondName: author.secondName
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
      obs$ = this.authorService.createAuthor(this.form.value.email,this.form.value.firstName,this.form.value.secondName)
    } else {
      obs$ = this.authorService.updateAuthor(this.author._id ,this.form.value.email,this.form.value.firstName,this.form.value.secondName)
    }
    
    obs$.subscribe(
      //success callback
      author => {
        this.author = author
        MaterialService.toast('Saved')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()        
      }
    )
  }

  deleteAuthor() {
    this.authorService.delete(this.author._id).subscribe(
      responce => MaterialService.toast(responce.message),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()        
      },
      () => this.router.navigate(['/authors'])
    )
  }


}
