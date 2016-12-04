import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { AngularFire, FirebaseObjectObservable, AngularFireAuth}  from 'angularfire2'; 

@Component({
  selector: 'app-verse-question',
  templateUrl: './verse-question.component.html',
  styleUrls: ['./verse-question.component.styl']
})
export class VerseQuestionComponent implements OnInit {
  @Input() question;
  currentUserQuestionLikes: FirebaseObjectObservable<any>; 
  isLiked: boolean; 

  constructor(private router: Router, private af: AngularFire, private afAuth: AngularFireAuth) { 
    this.isLiked = false; 
  }

  ngOnInit() {
    this.currentUserQuestionLikes = this.af.database.object('/questionLikes/' + 
                            this.afAuth.getAuth().uid + 
                            '/questions/' + 
                            this.question.$key);
    this.currentUserQuestionLikes.subscribe((status) => {
      this.isLiked = status.isLiked; 
    })
  }

  onQuestionSelect() {
    console.log(this.question.$key); 
    this.router.navigate(['/questions', this.question.$key]);    
  }

  onLikeSelect() {
    if (this.isLiked) {
      this.currentUserQuestionLikes.update({
        isLiked: !this.isLiked
      }).then((success) => {
        this.question.likes--; 
        this.af.database.object('/questions/' + this.question.$key).update({
                                  likes: this.question.likes
                                }); 
      });
    } else {
      this.currentUserQuestionLikes.update({
        isLiked: !this.isLiked
      }).then((success) => {
        this.question.likes++; 
        this.af.database.object('/questions/' + this.question.$key).update({
                                  likes: this.question.likes
                                }); 
      });
    }
  }

}
