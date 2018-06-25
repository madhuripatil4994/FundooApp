import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  model : any=[];

  constructor(private router: Router) { }
  ngOnInit() { }
  
  email = new FormControl(null, [Validators.required,Validators.email]);
  password = new FormControl(null,Validators.required);

  getErrorForEmail(){
    return this.email.hasError('required') ? 'Email Cannot be blank' : 
    this.email.hasError('email') ? 'Please provide proper email' : '';
  }

  getErrorForPassword(){
    return this.password.hasError('required') ? 'Password Cannot be blank' : '';
  }
 
  login(){
    console.log("inside login");
    if(this.model.email && this.model.password != undefined){
      console.log("inside if");
    this.router.navigate(['home']);
  }
  }
}