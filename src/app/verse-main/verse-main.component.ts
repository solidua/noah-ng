import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { AngularFire, FirebaseObjectObservable } from 'angularfire2'; 
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

  constructor(private route: ActivatedRoute, private af: AngularFire) { 
    this.hideAskQuestion = true; 
    this.newQuestion = new Question("", "TODO", "TODO", 0, 0);   
  }

  ngOnInit() {
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.verse = this.af.database.object('/translations/web/verses/' + id); 
      }); 
  }

  toggleAskQuestion() {
    this.hideAskQuestion = !this.hideAskQuestion; 
  }

  submitQuestion() {
    console.log(this.newQuestion);
    this.af.database.list('questions').push(this.newQuestion)
  }
}


class Question {
  constructor (
    public text: string, 
    public verseId: string,
    public authorId: string,
    public likes: number,
    public views: number
  ){}
}