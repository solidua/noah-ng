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
      console.log('hewwo'); 
      this.isLiked = status.isLiked; 
    })
  }

  onQuestionSelect() {
    console.log(this.question.$key); 
    this.router.navigate(['/questions', this.question.$key]);    
  }

  onLikeSelect() {
    console.log('like selected'); 
    this.currentUserQuestionLikes.update({
      isLiked: !this.isLiked
    }); 
    //update user's like for this question
    //update total likes for this question
    //change image of users heart of this quesiton. 
  }

}
