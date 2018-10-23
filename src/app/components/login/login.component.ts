import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  model: any = [];
  userRef;
  users;
  userKey;
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

    this.firebase.list('users').snapshotChanges().pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        let data: any = a.payload.val() || {};
        data.key = a.payload.key;
        this.userKey = data.key;
        return data;
      });
    })).subscribe(res => {
      this.users = res;
    })


    // this.firebase.list('/users',ref => ref.orderByChild("Email").equalTo(this.model.email)).valueChanges().subscribe(res => {
    //     this.users = res;
    //     var that = this;
    //      var userData = this.users.map(function (key) {         
    //        that.storeData(key);
    //       });
    // });
  }

  storeData(key) {
    localStorage.setItem('email', key.Email);
    localStorage.setItem('name', key.Name);
    localStorage.setItem('imageUrl', key.ImageUrl);
  }

}
