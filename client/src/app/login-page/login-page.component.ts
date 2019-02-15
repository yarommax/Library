import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
      private router: Router,
      private route: ActivatedRoute) {}

  ngOnInit() {
    //инициализируем нашу форму со следующими контролами в ней
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe( (params: Params) => {
      if(params['registered']) {
        //теперь вы можете зайти в систему используя свои данные
      } else if(params['accessDenied']){
        //для начала авторизуйтесь в системе
      }
    })
  }

  ngOnDestroy() {
    if(this.aSub){
      this.aSub.unsubscribe()
    }    
  }

  //при сабмите нашей формы - что должно происходить
  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }

}
