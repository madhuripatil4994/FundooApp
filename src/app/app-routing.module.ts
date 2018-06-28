import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';

const routes : Routes=[
    {
      path: '', redirectTo: 'home/notes', pathMatch:'full' 
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
          path : 'notes', component:NoteCardComponent
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