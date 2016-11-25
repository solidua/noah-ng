import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.styl']
})
export class ProfileMainComponent implements OnInit {
	hideQuestions: boolean;

  constructor() { 
  	this.hideQuestions = false;
  }

  ngOnInit() {
  }
  
  showQuestions() {
  	this.hideQuestions = false;
  }
  
  showAnswers() {
  	this.hideQuestions = true;
  }
 

}
