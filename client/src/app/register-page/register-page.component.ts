import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthService,
    private router: Router,) {}

    ngOnInit() {
      //инициализируем нашу форму со следующими контролами в ней
      this.form = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    }

    ngOnDestroy() {
      if(this.aSub){
        this.aSub.unsubscribe()
      }    
    }

    onSubmit() {
      this.form.disable()
      this.aSub = this.auth.registration(this.form.value).subscribe(
        () => this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        }),
        error => {
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      )
    }

}
