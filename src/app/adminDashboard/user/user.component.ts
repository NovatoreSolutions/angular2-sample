import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {ModalModule} from "ng2-modal"
import {MdSnackBar} from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  roles = [
   "Host","Cleaner","Agent"
  ];

  responseMessage : string;
  responseMessageUpdate: string;

  users: any = [];
  index:number;
  email: string;
  password: string;
  firstName : string;
  lastName : string;
  phone :string;
  role :string;
  id:any;
  updateEmail: string;
  updatePassword: string;
  updateFirstName : string;
  updateLastName : string;
  updatePhone :string;
  updateRole :string;


  constructor(private userService: UserService,public snackBar: MdSnackBar,public toastr: ToastsManager) {
    console.log("In component",this.users);


  }

  addUserDialog() {

    let user = {

      email : this.email,
      password : this.password,
      firstName:  this.firstName,
      lastName : this.lastName,
      phone : this.phone,
      role: this.role

    };
    console.log("user" , user);
    this.userService.addUser(user)
      .subscribe(
        data => {

          this.users.push(data.data);
          this.toastr.success(data.message, 'Success!');
          this.responseMessage = data.message;
           console.log('data',data);
           this.email = null;
           this.password= null;
           this.firstName = null;
           this.lastName =null;
           this.phone = null;
           this.role= null;

        },
        error => {
          let err = error.json();
          console.log('Error',err);

          this.responseMessage = err.data;
          this.toastr.error(err.data, 'Error in creation!');
        });
  }

  setObjtoUpdate(user,index) {




    console.log("user" , user);
    console.log("index" , index);
    this.index = index;
    this.id = user._id;
    this.updateEmail = user.email;
    this.updatePassword = user.password;
    this.updateFirstName= user.firstName;
    this.updateLastName = user.lastName;
    this.updatePhone = user.phone;
    this.updateRole = user.role;

  }



  editUserDialog() {

    let user = {


      email : this.updateEmail,
      password : this.updatePassword,
      firstName:  this.updateFirstName,
      lastName : this.updateLastName,
      phone : this.updatePhone,
      role: this.updateRole

    };
    console.log("user" , user);
    this.userService.editUser(user,this.id)
      .subscribe(
        data => {

        this.users[this.index]=data.data;
        this.responseMessageUpdate = data.message;
          this.toastr.success(data.message, 'Success');
        console.log('data',data);

      },
        error => {
        let err = error.json();
        console.log('Error',err);
        this.responseMessageUpdate = err.data;
          this.toastr.error(err.data, 'Error in update');
      });
  }

  setValueToDelete(user,index){

    this.id = user._id;
    this.index = index;
  }

  deleteUserDialog() {



    this.userService.deleteUser(this.id)
      .subscribe(
        data => {

          this.toastr.success('User Successfully deleted', 'Success!');
          this.users.splice(this.index,1);

        console.log('data',data);

      },
        error => {
        let err = error.json();
        console.log('Error',err);
          this.toastr.error('Error in Deletion!', 'Error!');
      });
  }
  ngOnInit() {

    this.userService.getAllUsers().subscribe(users => {
      console.log("data in component",users.data );
      this.users = users.data;

    },error => { console.log('Error');  });
  }

}
