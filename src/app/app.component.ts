import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { UserService } from './user.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  providers: [UserService]
})
export class AppComponent {
  title = 'app works!';
  constructor(private af: AngularFire, private userService: UserService) {
  }

  ngOnInit() {
  }

  signOut() {
    this.userService.signOut() 
  }

}
