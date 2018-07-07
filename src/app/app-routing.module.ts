import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { NoteComponent } from './components/note/note.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';

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
          path : 'notes', component:NoteComponent
        },
        {
          path : 'trash' ,component : TrashComponent
        },
        {
          path :'reminders' ,component : RemindersComponent
        },
        {
          path : 'archive', component: ArchiveComponent
        }
      ]
    }
    
]
@NgModule({
    imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
    exports: [RouterModule],
    declarations :[]
  })
  export class AppRoutingModule { }
