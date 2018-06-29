import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  notesArray;
  constructor(private router: Router, private firebase: AngularFireDatabase) {
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
    this.noteRef.push({
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
    this.firebase.list('notes').snapshotChanges().pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        let data : any = a.payload.val() || {};
        data.key = a.payload.key;
        return data;
      });
    })).subscribe(res => {
      this.notesArray = res;
      console.log("Notes:  ", this.notesArray);      
    })
  }

   updateNote(note,key){
   
    this.noteRef.update(key,note);
  }

  isTrashNote(note,key) { 
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


