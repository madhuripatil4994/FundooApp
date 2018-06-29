import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  model: any = [];
  userRef;

  constructor(private router: Router, private firebase: AngularFireDatabase) {
    this.userRef = firebase.list('users')
  }
  ngOnInit() { }

  email = new FormControl(null, [Validators.required, Validators.email]);
  password = new FormControl(null, Validators.required);

  getErrorForEmail() {
    return this.email.hasError('required') ? 'Email Cannot be blank' :
      this.email.hasError('email') ? 'Please provide proper email' : '';
  }

  getErrorForPassword() {
    return this.password.hasError('required') ? 'Password Cannot be blank' : '';
  }

  login() {
   this.firebase.list('/users', 
    ref => ref.orderByChild("Email").equalTo('madhuri@gmail.com')).valueChanges();
   
  }

}
