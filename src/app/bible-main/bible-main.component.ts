import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AngularFire, FirebaseListObservable, AngularFireAuth} from 'angularfire2'; 

@Component({
  selector: 'app-bible-main',
  templateUrl: './bible-main.component.html',
  styleUrls: ['./bible-main.component.styl']
})

export class BibleMainComponent implements OnInit {
  af: AngularFire; 
  afAuth: AngularFireAuth;
  router: Router; 
  chapters: FirebaseListObservable<any>[]; 
  verseStats: FirebaseListObservable<any>[]; 

  nextChapter; 

  constructor(af: AngularFire, router: Router, afAuth: AngularFireAuth) {
    this.af = af; 
    this.afAuth = afAuth; 
    this.router = router; 
    this.chapters = []; 
    this.verseStats = []; 
    this.nextChapter = 1; 
  }

  ngOnInit() {
    //test stuff

    console.log(new Date().toISOString()); 

    //
    this.getChapter('Genesis'); 
  }

  onVerseSelect(verseKey) {
    this.router.navigate(['/verses', verseKey]);    
    this.af.database.object('/verseStats/' + verseKey + '/views').$ref.transaction(value => {
      value = value + 1;  
      return value; 
    }); 
    window.scrollTo(0,0); 
  }

  onScrollDown() {
    this.getChapter('Genesis'); 
  }

  getChapter(book) {
    this.chapters.push(this.af.database.list('/translations/web/verses',  { 
      query: { 
        orderByChild: 'chapter', 
        equalTo: this.nextChapter
      }
    }));
    this.verseStats.push(this.af.database.list('/verseStats', {
      query: {
        orderByChild: 'chapter', 
        equalTo: this.nextChapter
      }
    }));

    this.nextChapter ++; 
  }

  checkNew(date) {
    if (Date.parse(date) - new Date().getTime() < 3600000) {
      return true;
    } else {
      return false;
    } 
  }
}
