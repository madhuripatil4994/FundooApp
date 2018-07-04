import { Component, OnInit,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData{

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
  constructor(private router: Router, private firebase: AngularFireDatabase,private dialog : MatDialog) {
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
      UserId : this.userKey,
      Notetitle: this.model.notetitle,
      NoteDesc: this.model.noteDesc,
      isTrash: false,
      isPin: false,
      isArchive: false
    })
    this.model.notetitle = ''
    this.model.noteDesc = ''
  }

  getNotes() {
    // this.firebase.database.ref("notes").on("value",(res)=>{
    //   console.log(res.val());
    // })
    this.firebase.list('notes',ref =>
  ref.orderByChild('UserId').equalTo(this.userKey)).snapshotChanges().pipe(map(items => {            // <== new way of chaining
      return items.map(note => {
        let data: any = note.payload.val() || {};
        data.key = note.payload.key;
        return data;
      });
    })).subscribe(res => {
      this.notesArray = res;
     console.log("Notes:  ", this.notesArray);
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
  openDialog() {
    const dialogRef = this.dialog.open(UpdateNoteDialog ,{
      height: '50px'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export class UpdateNoteDialog{
  constructor(public dialogRef :MatDialogRef <UpdateNoteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){}

    onCloseClick(): void {
      this.dialogRef.close();
    }
}










