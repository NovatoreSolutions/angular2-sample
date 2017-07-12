import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticated: any;
  returnUrl: string;

  constructor(  private router: Router,
                private authenticationService: AuthenticationService ) { }

  ngOnInit() {
    this.returnUrl = '/dashboard/admin';
    this.authenticated = this.authenticationService.authenticated();
    if ( this.authenticated ) this.router.navigate([this.returnUrl]);
  }

}
