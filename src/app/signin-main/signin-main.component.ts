import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../user.service'; 
import { AngularFireAuth} from 'angularfire2'; 

@Component({
	selector: 'app-signin-main',
	templateUrl: './signin-main.component.html',
	styleUrls: ['./signin-main.component.styl'],
  providers: [UserService]
})

export class SigninMainComponent{
  credentials = {
    email: null,
    password: null
  }

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private router: Router) {
  }

  ngOnInit() {
    this.afAuth.subscribe(auth => {
      if (auth) {
        this.router.navigate([''])
      } else {
        console.log('no one is signed in')
      }
    })
  }
}