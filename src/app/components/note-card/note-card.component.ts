import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  public note: boolean = true;
  public mainnote: boolean = false;
  constructor(private router : Router) { }

  ngOnInit() {
  }

   showNote()
  {
    this.mainnote = true;
    this.note = false;
  }

  hideNote()
  {
    this.mainnote = false;
    this.note = true;
  }

  }


