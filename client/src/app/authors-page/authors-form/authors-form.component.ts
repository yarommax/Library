import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorsService } from 'src/app/shared/services/authors.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-authors-form',
  templateUrl: './authors-form.component.html',
  styleUrls: ['./authors-form.component.css']
})
export class AuthorsFormComponent implements OnInit {

  isNew = true
  form: FormGroup

  constructor(private route: ActivatedRoute,
    private authorService: AuthorsService) { }

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
    this.authorService.createAuthor(this.form)
  }

}
