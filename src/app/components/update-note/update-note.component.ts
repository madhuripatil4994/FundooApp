import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  public note;
  public colors : string[][];
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public MatRef: MatDialogRef<UpdateNoteComponent>) {
    this.note = data;
    console.log(this.note);
    
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

}
