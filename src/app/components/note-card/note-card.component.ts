import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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
    this.firebase.list('notes').valueChanges().subscribe(res => {
      this.notesArray = res;
      console.log("Notes:  ", this.notesArray);
    })
  }
  isTrashNote() {

  }

  isPinNote() {

  }

  isArchiveNote() {

  }
}


