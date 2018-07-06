import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';


export interface DialogData {

}
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public note: boolean = true;
  public mainnote: boolean = false;
  noteRef;
  model: any = [];
  notesArray;
  clock = "assets/images/clock.svg";
  backarrow = "assets/images/back.svg";
  constructor(private router: Router, private firebase: AngularFireDatabase, private dialog: MatDialog) {
    this.noteRef = firebase.list('notes')

  }

  ngOnInit() {
    this.getNotes()
  }

  showNote() {
    this.mainnote = true;
    this.note = false;
  }

  hideNote() {
    this.mainnote = false;
    this.note = true;
  }
  userKey = localStorage.getItem('userKey');
  createNote() {
      this.noteRef.push({
        UserId: this.userKey,
        Notetitle: this.model.notetitle,
        NoteDesc: this.model.noteDesc,
        isTrash: false,
        isPin: false,
        isArchive: false,
        ImageUrl :'',
        remainder : []
      })   
      this.model.notetitle = ''
      this.model.noteDesc = ''
  }

  getNotes() {
    // this.firebase.database.ref("notes").on("value",(res)=>{
    //   console.log(res.val());
    // })
    this.firebase.list('notes', ref =>
      ref.orderByChild('UserId').equalTo(this.userKey)).snapshotChanges().pipe(map(items => {            // <== new way of chaining
        return items.map(note => {
          let data: any = note.payload.val() || {};
          data.key = note.payload.key;
          return data;
        });
      })).subscribe(res => {
        this.notesArray = res;
     
      })
  }

  updateNote(note, key) {
 
    this.noteRef.update(key, note);
    
  }

  isTrashNote(note, key) {
    console.log(key);
    if (note.isTrash === false) {
      note.isTrash = true
    }
    else {
      note.isTrash = false
    }
    this.updateNote(note, key)
  }

  isPinNote(note, key) {
    if (note.isPin === false) {
      note.isPin = true;
    }
    else {
      note.isPin = false;
    }
    this.updateNote(note, key);
  }

  isArchiveNote(note, key) {
    if (note.isArchive === false) {
      note.isArchive = true
    }
    else {
      note.isArchive = false;
    }
    this.updateNote(note, key)
  }

  OpenUpdateComponent(note) {
      this.dialog.open(UpdateNoteComponent, {
        data  :note,
      width: '600px',
      panelClass: 'custom-dialog-container'
    });
    //this.noteServiceObj.OpenUpdateComponent(note, this.labelService.allLabels);

  }

  setToday(note,key) {
    var today = new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.remainder = [today]; 
   this.updateNote(note,key) 
  }

  setTomorrow(note,key) {
    console.log("Tomorrow", note);

    var tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    tommorow.setHours(8);
    tommorow.setMinutes(0);
    tommorow.setMilliseconds(0);
    note.remainder = [tommorow];
    this.updateNote(note,key) 

    
  }

  setNextweek(note,key){
    console.log("Next week", note);

    var today = new Date();
    today.setDate(today.getDate() + 6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.remainder = [today];
    this.updateNote(note,key) 
  }
  form1: boolean;
  form2: boolean;

  pickDateTime(note,key) {
    console.log("note", key);
    this.updateNote(note,key) 
    this.form1 = false;
    this.form2 = false;
  }
  showform1() {
    this.form1 = true;
    this.form2 = false;
  }

  removeReminder(note,key) {
    console.log(note)
    note.remainder = '';
   this.updateNote(note,key)
  }
  
}










