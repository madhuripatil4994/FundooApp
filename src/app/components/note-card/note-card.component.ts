import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  public note: boolean = true;
  public mainnote: boolean = false;
  noteRef;
  model: any = [];
  notes = [];
  pinnedNotesArray = [];
  pinned = false;

  constructor(private firebase: AngularFireDatabase) {
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
  createNote() {
    var title = document.getElementById("title").innerHTML;
    var description = document.getElementById("description").innerHTML;
    if(title !== null && description !== null && title !== "" && description !== "") {
    this.noteRef.push({
      Notetitle: title,
      NoteDesc: description,
      isTrash: false,
      isPin: false,
      isArchive: false
    })
    title = ''
    description = ''
  }
}


  getNotes() {
    this.firebase.list('notes').snapshotChanges().pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        let data: any = a.payload.val() || {};
        data.key = a.payload.key;
        return data;
      });
    })).subscribe(res => {
      res.forEach(note => {
        if (note.isPin == true) {
          this.pinnedNotesArray.push(note);
          this.pinned = true;
        }
        if (note.isPin === false && note.isTrash === false && note.isArchive === false) {
          this.notes.push(note);
        };
      })
    })
  }
}

