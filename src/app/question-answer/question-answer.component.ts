import { Component, OnInit, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, AngularFireAuth } from 'angularfire2'; 

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.styl']
})
export class QuestionAnswerComponent implements OnInit {
  @Input() answer
  currentUserAnswerLikes: FirebaseObjectObservable<any>; 
  isLiked: boolean

  constructor(private af: AngularFire, private afAuth: AngularFireAuth) { 
    this.isLiked = false; 
  }

  ngOnInit() {
    this.currentUserAnswerLikes = this.af.database.object('/answerLikes/' +
                                                          this.afAuth.getAuth().uid +
                                                          '/answers/' + 
                                                          this.answer.$key); 
    this.currentUserAnswerLikes.subscribe((status) => {
      console.log('hewwo'); 
      this.isLiked = status.isLiked; 
    })
  }

  onLikeSelect() {
    console.log('like selected'); 
    this.currentUserAnswerLikes.update({
      isLiked: !this.isLiked
    }); 
  }
}
