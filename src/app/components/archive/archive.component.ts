import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  noteRef;
  notesArray = [];
  constructor(private firebase: AngularFireDatabase) {
    this.noteRef = firebase.list('notes')

  }

  ngOnInit() {
    this.getNotes()
  }

  getNotes() {
    this.firebase.list('/notes', ref => ref.orderByChild("userName").equalTo(localStorage.getItem('name'))).snapshotChanges().pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        let data: any = a.payload.val() || {};
        data.key = a.payload.key;
        return data;
      });
    })).subscribe(res => {
      res.forEach(note => {
        if(note.isArchive == true)
          this.notesArray.push(note)
      });
    })
  }
}
