import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isVisible: boolean = false;

  constructor(private router: Router) {
    this.changeToolbarColor();
  }
  ngOnInit() { }

  showHide() {
    this.isVisible = this.isVisible ? false : true;
  }

  changeToolbarColor() {
    console.log(this.router.url);

    if (this.router.url == '/home' || this.router.url == '/home/note') {
      var myStyle = {
        'background-color': '#fb0',
        'color' : 'black'
      }
    }

    else if (this.router.url == '/home/reminders') {
      var myStyle = {
        'background-color': 'rgb(96, 125, 139)',
        'color' : 'white'
      }
    }

    else if (this.router.url == '/home/archive') {
      var myStyle = {
        'background-color': 'rgb(96, 125, 139)',
        'color' : 'white'
      }
    }
    else if (this.router.url == '/home/trash') {
      var myStyle = {
        'background-color' : 'rgb(99, 99, 99)', 
        'color' : 'white'
      }
    }

    return myStyle;
  }
}

