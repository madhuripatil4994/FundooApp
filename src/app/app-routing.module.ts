import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';

const routes : Routes=[
    {
      path:'',
      component : LoginComponent
    },
    {
      path : 'register',
      component : RegisterComponent
    },
    {
      path : 'login',
      component : LoginComponent
    },
    {
      path : 'forgotPassword',
      component : ForgotPasswordComponent
    },
    {
      path : 'home',
      component : HomeComponent
    }
]
@NgModule({
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }