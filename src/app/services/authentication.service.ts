import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthenticationService {

    constructor(private http: Http) { }

    login(email: string, password: string) {

        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option


        return this.http.post('/api/sign-in', JSON.stringify({ email: email, password: password }), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response

                let user = response.json();
                console.log("user", user)


                if (user.data.admin && user.data.token) {
                  console.log("in condition")
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user.data));
                  localStorage.setItem('token', user.data.token);
            }
        });
    }

    register( firstname: string, lastname: string, email: string, password: string, terms: boolean) {

        let user = {
                        firstName: firstname,
                        lastName: lastname,
                        email: email,
                        password: password,
                        terms: terms
                    };

        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option



        return this.http.post('http://localhost:3000/user/signup', JSON.stringify( user ), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    return user;
                }

        });

    }


    authenticated() {

        let user : any = JSON.parse (localStorage.getItem('currentUser'));
        return user && user.token ? true : false;
    };

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
}
