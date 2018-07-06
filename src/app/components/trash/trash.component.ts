import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { AngularFireDatabase} from 'angularfire2/database'
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  notesArray;
  noteRef;
  constructor(private firebase : AngularFireDatabase) { 
    this.noteRef = firebase.list('notes')
  }

  ngOnInit() {
    this.getNotes();
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

  isTrashNote(note,key) { 
    if(note.isTrash === false){
      note.isTrash = true
    }
    else{
      note.isTrash =false
    }
     this.updateNote(note,key)
  }

  deleteNoteForever(key){
    this.noteRef.remove(key);
  }
   updateNote(note,key){  
    this.noteRef.update(key,note);
  }
}
