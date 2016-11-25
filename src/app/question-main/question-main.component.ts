import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2'; 
import { Answer }  from '../answer'; 
import { Question } from '../question'; 

@Component({
  selector: 'app-question-main',
  templateUrl: './question-main.component.html',
  styleUrls: ['./question-main.component.styl']
})
export class QuestionMainComponent implements OnInit {
  hideAnswerQuestion: boolean; 
  newAnswer: Answer;
  question: FirebaseObjectObservable<any>; 
  answers: FirebaseListObservable<any>; 
  enableAnswerButton : boolean; 

  constructor(private af: AngularFire, private route: ActivatedRoute) { 
    this.hideAnswerQuestion = true; 
    this.enableAnswerButton = false; 
  }

  ngOnInit() {
     this.route.params.map(params => params['id'])
       .subscribe((id) => {
         this.enableAnswerButton = true; 
         this.newAnswer = new Answer("", id, "TODO", 0, 0); 
         this.question = this.af.database.object('/questions/' + id); 
         this.answers = this.af.database.list('/answers', {
           query: {
             orderByChild: 'questionId', 
             equalTo: id
           }
         }); 
       }); 
  }

  toggleAnswerQuestion() {
    this.hideAnswerQuestion = !this.hideAnswerQuestion; 
    window.scrollTo(0,0);
  }

  submitAnswer() {
    this.af.database.list('/answers').push(this.newAnswer).then(success => {
      console.log(success); 
    }); 
    this.toggleAnswerQuestion(); 
  }
}
