import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  public note;
  public colors: string[][];
  noteRef;
  pin = "/assets/images/pin.svg";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public MatRef: MatDialogRef<UpdateNoteComponent>,
    private firebase: AngularFireDatabase) {
    this.note = data;
    console.log(this.note);
    this.noteRef = firebase.list('notes')

  }

  ngOnInit() {
  }
  form1: boolean;
  form2: boolean;
  showform1() {
    this.form1 = true;
    this.form2 = false;
  }
  showform2() {
    this.form1 = false;
    this.form2 = true;
  }

  updateNote(note, key) {
    this.noteRef.update(key, note);
  }


  isPinNote(note, key) {
    if (note.isPin === false) {
      note.isPin = true;
      this.pin = "/assets/images/unpin.svg"
    }
    else {
      note.isPin = false;
      this.pin = "/assets/images/pin.svg"
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



  setToday(note, key) {
    var today = new Date();
    today.setHours(20);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.remainder = [today];
    this.updateNote(note, key)
  }

  setTomorrow(note, key) {
    console.log("Tomorrow", note);

    var tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    tommorow.setHours(8);
    tommorow.setMinutes(0);
    tommorow.setMilliseconds(0);
    note.remainder = [tommorow];
    this.updateNote(note, key)


  }

  setNextweek(note, key) {
    console.log("Next week", note);

    var today = new Date();
    today.setDate(today.getDate() + 6);
    today.setHours(8);
    today.setMinutes(0);
    today.setMilliseconds(0);
    note.remainder = [today];
    this.updateNote(note, key)
  }

  pickDateTime(note, key) {
    console.log("note", key);
    this.updateNote(note, key)
    this.form1 = false;
    this.form2 = false;
  }

  removeReminder(note, key) {
    note.remainder = [];
    this.updateNote(note, key)
  }
}
