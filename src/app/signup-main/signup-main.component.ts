import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; 

@Component({
  selector: 'app-signup-main',
  templateUrl: './signup-main.component.html',
  styleUrls: ['./signup-main.component.styl'],
  providers: [UserService]
})

export class SignupMainComponent implements OnInit {

  constructor(private userService: UserService) { 

  }

  ngOnInit() {
    this.userService.createUser('Alvin Solidum', 'test@test.com', 'password')
  }
}
