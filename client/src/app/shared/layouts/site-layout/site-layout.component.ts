import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/authors', name: 'Authors'},
    {url: '/books', name: 'Books'}
  ]

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
