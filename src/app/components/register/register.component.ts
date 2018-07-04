import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRef;
  model : any =[];
  constructor(private route: Router,private firebase :AngularFireDatabase ) { 
    this.userRef = firebase.list('users');
  }

  nameExp = '[a-zA-Z ]*$';
  contactExp = '^[0-9]*$'
  

  name = new FormControl(null, [Validators.required, Validators.pattern(this.nameExp)])
  email = new FormControl(null, [Validators.required, Validators.email])
  password = new FormControl(null, Validators.required)
  cpassword = new FormControl(null, Validators.required);
  contact = new FormControl(null, [Validators.required, Validators.pattern(this.contactExp)])



  ngOnInit() { }
  getErrorForEmail() {
    return this.email.hasError('required') ? 'Email Cannot be blank' :
      this.email.hasError('email') ? 'Please provide proper email' : '';
  }

  getErrorForPassword() {
    return this.password.hasError('required') ? 'Password Cannot be blank' : '';
  }

  getErrorForName() {
    return this.name.hasError('required') ? 'Name cannot be blank' :
      this.name.hasError('pattern') ? 'Name cannot contains numbers' : '';
  }

  getErrorForCpassword() {
    return this.cpassword.hasError('required') ? 'Confirm password cannot be blank' : '';
  }

  getErrorForContact() {
    return this.contact.hasError('required') ? 'Contact cannot be blank' :
      this.contact.hasError('pattern') ? 'Contact number cannot contains alphabet' : '';
  }

  register() {
    if(this.model.name && this.model.email && this.model.password && this.model.cpassword && this.model.contact != undefined){
      this.userRef.push({
        Name : this.model.name,
        Email : this.model.email,
        Password : this.model.password,
        Contact :this.model.contact,
        ImageUrl : ''
      })
    this.route.navigate(['login']);
  }
  else{
    this.route.navigate(['register']);
  }
  }
}
