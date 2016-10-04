import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; 

@Component({
  selector: 'app-signup-main',
  templateUrl: './signup-main.component.html',
  styleUrls: ['./signup-main.component.styl'],
  providers: [UserService]
})

export class SignupMainComponent implements OnInit {
  newUser = {
    'fullname': null, 
    'email': null, 
    'password': null 
  }

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.createUser(this.newUser.fullname, this.newUser.email, this.newUser.password)  
  }

  onFacebook() {
    this.userService.fbSignin()
  }

  onGoogle() {
    this.userService.googleSignin() 
  }

  onTwitter() {
    this.userService.twitterSignin()
  }
}
