import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage'
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isVisible: boolean = false;
  public email: string;
  public name: string;
  // uploadPercent: Observable<number>;
  // downloadURL: Observable<string>;
  constructor(private router: Router,
     private storageRef: AngularFireStorage,
      private firebase : AngularFireDatabase) {
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
        'color': 'black',
        title: "Google Keep"
      }
    }

    else if (this.router.url == '/home/reminders') {
      var myStyle = {
        'background-color': 'rgb(96, 125, 139)',
        'color': 'white',
        title: "Reminders"
      }
    }

    else if (this.router.url == '/home/archive') {
      var myStyle = {
        'background-color': 'rgb(96, 125, 139)',
        'color': 'white',
        title: "Archive"
      }
    }
    else if (this.router.url == '/home/trash') {
      var myStyle = {
        'background-color': 'rgb(99, 99, 99)',
        'color': 'white',
        title: "Trash"
      }
    }
    return myStyle;
  }

  goToTrash() {
    this.router.navigate(['/home/trash']);
  }

  goToHome() {
    this.router.navigate(['/home/notes']);
  }

  goToReminders() {
    this.router.navigate(['/home/reminders']);
  }

  goToArchive() {
    this.router.navigate(['/home/archive']);
  }

  getData() {
    this.email = localStorage.getItem('email')
    this.name = localStorage.getItem('Name')
  }
  selectedFile: FileList
  file: File
  imgSrc;

 
  profilePicUpload(event) {

    this.selectedFile = event.target.files;
    if (this.selectedFile.item(0)) {
      this.uploadPic();
    }
  }
  userKey = localStorage.getItem('userKey');
  uploadPic() {
    let file = this.selectedFile.item(0);
    let uniqueKey = 'pic' + Math.floor(Math.random() * 1000000);
    const uploadTask = this.storageRef.upload('profileImages/' + uniqueKey, file);
    let imageUrl;
    uploadTask.then((data)=>{
      imageUrl=data.downloadURL;
      var update = {
        ImageUrl : imageUrl
      }
      let users = this.firebase.list('users');
      users.update(this.userKey,update);
    })
        
  }




}
