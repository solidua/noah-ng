import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AngularFireAuth} from 'angularfire2'; 
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
  enableAnswerButton1 : boolean; 
  enableAnswerButton2: boolean;
  username: string; 

  constructor(private af: AngularFire, private route: ActivatedRoute, private afAuth: AngularFireAuth) { 
    this.hideAnswerQuestion = true; 
    this.enableAnswerButton1 = false; 
    this.enableAnswerButton2 = false; 
    this.username = null; 
  }

  ngOnInit() {
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.enableAnswerButton1 = true; 
        this.newAnswer = new Answer("", id, this.afAuth.getAuth().uid, this.username, 0, 0, ""); 
        this.question = this.af.database.object('/questions/' + id); 
        this.answers = this.af.database.list('/answers', {
        query: {
          orderByChild: 'questionId', 
          equalTo: id
        }
      }); 
    }); 

    this.afAuth.subscribe(state => {
      this.username = state.auth.displayName; 
      this.enableAnswerButton2 = true; 
    })

  }

  toggleAnswerQuestion() {
    this.hideAnswerQuestion = !this.hideAnswerQuestion; 
    window.scrollTo(0,0);
  }

  submitAnswer() {
    this.newAnswer.author = this.username; 
    this.newAnswer.dateCreated = new Date().toISOString(); 
    this.af.database.list('/answers').push(this.newAnswer).then(success => {
      console.log(success); 
      this.newAnswer = new Answer("", this.newAnswer.questionId, this.afAuth.getAuth().uid, this.username, 0, 0, ""); 
      this.toggleAnswerQuestion(); 
    }); 
  }
}
