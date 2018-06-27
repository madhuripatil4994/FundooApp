import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { TrashComponent } from './components/trash/trash.component';

const routes : Routes=[
    {
      path: '', redirectTo: 'login', pathMatch:'full' 
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
      path : 'home',component : HomeComponent,children : [
        {
          path : 'note', component:NoteCardComponent
        },
        {
          path : 'trash' ,component : TrashComponent
        }
      ]
    }
    
]
@NgModule({
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }