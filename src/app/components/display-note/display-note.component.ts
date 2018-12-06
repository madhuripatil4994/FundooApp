import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import { MatDialog } from '@angular/material';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {
  @Input() note;
  noteRef;
  notesArray;
 
  constructor(private router: Router, private firebase: AngularFireDatabase,private dialog: MatDialog) {
    this.noteRef = firebase.list('notes')
  }

  ngOnInit() {
    this.getNotes()
  }
 
  getNotes() {
    this.firebase.list('notes').snapshotChanges().pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        let data : any = a.payload.val() || {};
        data.key = a.payload.key;
        return data;
      });
    })).subscribe(res => {
      this.notesArray = res;
    })
  }

   updateNote(note,key){
    this.noteRef.update(key,note);
  }

  isTrashNote(note,key) {
    console.log("inside isTrashNote")
    console.log(key);
    if(note.isTrash === false){
      note.isTrash = true
    }
    else{
      note.isTrash =false
    }
     this.updateNote(note,key)
  }

  isPinNote(note,key) {
      if(note.isPin === false){
        note.isPin=true;
      }
      else{
        note.isPin = false;
      }
      this.updateNote(note,key);
  }

  isArchiveNote(note,key) {
      if(note.isArchive === false){
        note.isArchive = true
      }
      else{
        note.isArchive = false;
      }
      this.updateNote(note,key)
  }

  deleteNote(key) {
    this.noteRef.remove(key);
  }

  todayReminder = function(note, key) {
    console.log('inside todayReminder');
   var today = new Date();
    if (today.getHours() > 20 && today.getHours() < 8) {
      today.setHours(8);
      today.setMinutes(0);
      today.setMilliseconds(0);

    } else if (today.getHours() < 20 && today.getHours() > 8) {
      today.setHours(20);
      today.setMinutes(0);
      today.setMilliseconds(0);

    }
   
    console.log("today: ",today);
    note.reminder = today;
    this.updateNote(note,key)

  }

  tomorrowReminder = function(note, key) {
    console.log('inside tomorrowReminder');
   var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8);
    tomorrow.setMinutes(0);
    tomorrow.setMilliseconds(0);

    note.reminder = tomorrow;
    this.updateNote(note,key)
  }

  nextWeekReminder = function(note, key) {
    console.log("inside nextWeekReminder");
   var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(8);
    nextWeek.setMinutes(0);
    nextWeek.setMilliseconds(0);

    note.reminder =nextWeek;
    this.updateNote(note,key)
  }
 removeReminder = function(note, key) {
    console.log("inside remove reminder method...");
    note.reminder = '';
    this.updateNote(note,key)
  }
  
  OpenUpdateComponent(note) {
    console.log("update", note);
    var obj = { 'note': note};

    this.dialog.open(UpdatenoteComponent, {
      data: obj,
      width: '600px',
      panelClass: 'custom-dialog-container'
    });
    //this.noteServiceObj.OpenUpdateComponent(note, this.labelService.allLabels);

  }
}


