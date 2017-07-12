import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  responseMessage : string;
  email: string;
  password: string;
  returnUrl: string;
  authenticated : boolean;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService)
  { }

  ngOnInit() {
        this.returnUrl = '/dashboard/admin';
        this.authenticated = this.authenticationService.authenticated();
        if ( this.authenticated ) this.router.navigate([this.returnUrl]);
  }

  login() {

    if(this.email && this.password){

      this.authenticationService.login(this.email, this.password)
        .subscribe(
          data => {

          this.router.navigate([this.returnUrl]);
        },
          error => {


          let err = error.json();
          console.log('Error',err);
          this.responseMessage = err.message;




        });
    }
    else{
      this.responseMessage = "Please provide Email and password";
    }

  }

}
