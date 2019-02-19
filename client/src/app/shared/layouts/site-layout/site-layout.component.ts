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
    {url: '/overview', name: 'Information'},
    {url: '/authors', name: 'Add authors'},
    {url: '/books', name: 'Add books'}
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
