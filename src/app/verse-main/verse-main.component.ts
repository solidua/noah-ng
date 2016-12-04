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
  enableAskButton: boolean
  questions: FirebaseListObservable<any>; 

  constructor(private route: ActivatedRoute, private af: AngularFire, private afAuth: AngularFireAuth) { 
    this.hideAskQuestion = true; 
    this.enableAskButton = false; 
  }

  ngOnInit() {
    //what does map do? why does it have to be an obeservable?
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.enableAskButton = true; 
        this.newQuestion = new Question("", id, this.afAuth.getAuth().uid, 0, 0);
        this.verse = this.af.database.object('/translations/web/verses/' + id); 
        this.questions = this.af.database.list('/questions', {
          query: {
            orderByChild: 'verseId',
            equalTo: id
          }
        })
      }); 
  }

  toggleAskQuestion() {
    this.hideAskQuestion = !this.hideAskQuestion;
    window.scrollTo(0,0); 
  }

  submitQuestion() {
    this.af.database.list('questions').push(this.newQuestion).then(success => {
      console.log(success); 
      this.newQuestion = new Question("", this.newQuestion.verseId, this.afAuth.getAuth().uid, 0, 0);
      this.toggleAskQuestion();
    }); 
  }
}
