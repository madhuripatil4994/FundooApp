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
      if (this.router.url == '/home' || this.router.url == '/home/notes') {
      var myStyle = {
        'background-color': '#fb0',
        'color' : 'black',
         title : "Google Keep"
      }
    }

    else if (this.router.url == '/home/reminders') {
      var myStyle = {
        'background-color': 'rgb(96, 125, 139)',
        'color' : 'white',
        title : "Reminders"
      }
    }

    else if (this.router.url == '/home/archive') {
      var myStyle = {
        'background-color': 'rgb(96, 125, 139)',
        'color' : 'white',
        title : "Archive"
      }
    }
    else if (this.router.url == '/home/trash') {
      var myStyle = {
        'background-color' : 'rgb(99, 99, 99)',
        'color' : 'white',
        title : "Trash"
      }
    }
    return myStyle;
  }

  goToTrash(){
    this.router.navigate(['/home/trash']);
  }

  goToHome(){
    this.router.navigate(['/home/notes']);
  }

  goToReminders(){
    this.router.navigate(['/home/reminders']);
  }

  goToArchive(){
    this.router.navigate(['/home/archive']);
  }
}
