import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../user.service'; 
import { AngularFire, AngularFireAuth } from 'angularfire2'; 

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

  constructor(private userService: UserService, private af: AngularFire, private router: Router) {  
  }

  ngOnInit() {  
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.router.navigate([''])
      } else {
        console.log('no one is signed in')
      }
    })
  }

  onSubmit() {
    this.userService.createUser(this.newUser.fullname, this.newUser.email, this.newUser.password)  
  }
}
