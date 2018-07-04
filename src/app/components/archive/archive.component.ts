import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import {AngularFireDatabase} from 'angularfire2/database'
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  noteRef
  notesArray
  constructor(private firebase : AngularFireDatabase) {
    this.noteRef = firebase.list('notes')
   }

  ngOnInit() {
    this.getNotes()
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

  isArchiveNote(note,key) {
    if(note.isArchive === false){
      note.isArchive = true
   }
    else{
      note.isArchive = false;
    }
    this.updateNote(note,key)
}

}
