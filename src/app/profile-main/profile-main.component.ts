import {
  Component,
  OnInit,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.styl'],
  animations: [
    trigger('profileState', [
      state('inactive', style({
        opacity: '0',
        display: 'none'
      })),
      state('active',   style({
        opacity: '1',
        display: 'block'
      })),
      transition('inactive => active', animate('.2s .2s ease-in')),
      transition('active => inactive', animate('.2s ease-out'))
    ])
  ]
})
export class ProfileMainComponent implements OnInit {
	hideQuestions: boolean;
	questionsState: string;
	answersState: string;

  constructor() { 
  	this.hideQuestions = false;
		this.questionsState = 'active';
		this.answersState = 'inactive';
  }

  ngOnInit() {
  }
  
  showQuestions() {
  	this.hideQuestions = false;
  	this.questionsState = 'active';
  	this.answersState = 'inactive';
  }
  
  showAnswers() {
  	this.hideQuestions = true;
  	this.questionsState = 'inactive';
  	this.answersState = 'active';
  }
 

}
