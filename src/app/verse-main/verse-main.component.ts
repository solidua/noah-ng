import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable, AngularFireAuth } from 'angularfire2'; 
import { Question } from '../question'; 
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-verse-main',
  templateUrl: './verse-main.component.html',
  styleUrls: ['./verse-main.component.styl']
})
export class VerseMainComponent implements OnInit {
  verse: FirebaseObjectObservable<any>; 
  newQuestion: Question; 
  hideAskQuestion: boolean; 
  enableAskButton1: boolean; 
  enableAskButton2: boolean; 
  username: string; 
  questions: FirebaseListObservable<any>; 

  constructor(private route: ActivatedRoute, private af: AngularFire, private afAuth: AngularFireAuth) { 
    this.hideAskQuestion = true; 
    this.enableAskButton1 = false; 
    this.enableAskButton2 = false; 
    this.username = null; 
  }

  ngOnInit() {
    //what does map do? why does it have to be an obeservable?
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.enableAskButton1 = true; 
        this.newQuestion = new Question("", id, this.afAuth.getAuth().uid, this.username, 0, 0, "");
        this.verse = this.af.database.object('/translations/web/verses/' + id); 
        this.questions = this.af.database.list('/questions', {
          query: {
            orderByChild: 'verseId',
            equalTo: id
          }
        })
      }); 

    this.afAuth.subscribe(state => {
      this.username = state.auth.displayName; 
      this.enableAskButton2 = true; 
      console.log(this.username); 
    })
  }

  toggleAskQuestion() {
    this.hideAskQuestion = !this.hideAskQuestion;
    window.scrollTo(0,0); 
  }

  submitQuestion() {
    this.newQuestion.author = this.username;
    this.newQuestion.dateCreated = new Date().toISOString(); 
    this.af.database.list('questions').push(this.newQuestion).then(success => {
      this.toggleAskQuestion();
      this.af.database.object('/verseStats/' + this.newQuestion.verseId + '/questionsCount').$ref.transaction(value => { 
        value = value + 1;
        return value;
      });
      this.af.database.object('/verseStats/' + this.newQuestion.verseId + '/newestQuestionDate').$ref.transaction(value => { 
        console.log('HELLO');
        console.log(this.newQuestion.dateCreated);  
        return this.newQuestion.dateCreated;  
      });  
      // this.newQuestion = new Question("", this.newQuestion.verseId, this.afAuth.getAuth().uid, this.username, 0, 0, "");
    }); 
  }
}




