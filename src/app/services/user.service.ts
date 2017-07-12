import { Injectable } from '@angular/core';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class UserService {

  constructor(private http: Http) { }


  getAllUsers() {

    var token = localStorage.getItem("token");

    let headers      = new Headers({ 'Content-Type': 'application/json', 'token': token }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.get('/api/users', options)
      .map(res => res.json());
  }

  addUser(user : any) {

    var token = localStorage.getItem("token");

    let headers      = new Headers({ 'Content-Type': 'application/json', 'token': token }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.post('/api/users',user, options)
      .map(res => res.json());
  }

  editUser(user : any,id:any) {

    var token = localStorage.getItem("token");

    let headers      = new Headers({ 'Content-Type': 'application/json', 'token': token }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.put('/api/users/'+ id ,user, options)
      .map(res => res.json());
  }

  deleteUser(id:any) {

    var token = localStorage.getItem("token");

    let headers      = new Headers({ 'Content-Type': 'application/json', 'token': token }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.delete('/api/users/'+ id , options)
      .map(res => res.json());
  }

  addSchedule(schedule : any) {

    var token = localStorage.getItem("token");

    let headers      = new Headers({ 'Content-Type': 'application/json', 'token': token }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.post('/api/schedules',schedule, options)
      .map(res => res.json());
  }

  getAllSchedules() {

    var token = localStorage.getItem("token");

    let headers      = new Headers({ 'Content-Type': 'application/json', 'token': token }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.get('/api/schedules', options)
      .map(res => res.json());
  }

  getSchedulesForUser(id:any) {

    var token = localStorage.getItem("token");
    let headers      = new Headers({ 'Content-Type': 'application/json', 'token': token }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.get('/api/users/'+ id +'/schedules', options)
      .map(res => res.json());
  }

  deleteSchedule(id:any) {

    console.log(id);
    var token = localStorage.getItem("token");

    let headers      = new Headers({ 'Content-Type': 'application/json', 'token': token }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option


    return this.http.delete('/api/schedules/' + id, options)
      .map(res => res.json());
  }
}
