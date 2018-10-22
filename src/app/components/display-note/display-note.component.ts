import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
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
  constructor(private router: Router, private firebase: AngularFireDatabase) {
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
        console.log(note);

      }
      else{
        note.isPin = false;
      }
      this.updateNote(note,key);
  }

  isArchiveNote(note,key) {
      if(note.isArchive === false){
        note.isArchive = true
        console.log(note);
      }
      else{
        note.isArchive = false;
      }
      this.updateNote(note,key)
  }
}


