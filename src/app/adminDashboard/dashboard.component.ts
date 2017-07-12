import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  returnUrl: string;
  authenticated: boolean;

  constructor( private router: Router,
               private authenticationService: AuthenticationService ) { }

  ngOnInit() {

    this.authenticated = this.authenticationService.authenticated();
    if ( ! this.authenticated ) {
      this.returnUrl = '/login';
      this.router.navigate([this.returnUrl]);
    }

  }

  logout () {

    this.authenticationService.logout();
    this.returnUrl = '/';
    this.router.navigate([this.returnUrl]);

  }




}
