import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name :[null,[Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      cpassword :[null, Validators.required],
      contact : [null,Validators.required]
    });
  }

}
