import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppMaterial } from './appmaterial.module';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import {NoteComponent} from './components/note/note.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { MAT_DIALOG_DATA } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    NoteComponent,
    TrashComponent,
    RemindersComponent,
    ArchiveComponent,
    UpdateNoteComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    AppMaterial,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,

  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [  {provide:MAT_DIALOG_DATA,useValue:{}}],
  bootstrap: [AppComponent],
  entryComponents :[HomeComponent,UpdateNoteComponent]
})
export class AppModule { }
