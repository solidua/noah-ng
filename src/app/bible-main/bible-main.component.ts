import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AngularFire, FirebaseListObservable} from 'angularfire2'; 

@Component({
  selector: 'app-bible-main',
  templateUrl: './bible-main.component.html',
  styleUrls: ['./bible-main.component.styl']
})
export class BibleMainComponent implements OnInit {
  af: AngularFire; 
  router: Router; 
  chapters: FirebaseListObservable<any>[]; 
  verseStats: FirebaseListObservable<any>[]; 

  nextChapter; 

  constructor(af: AngularFire, router: Router) {
    this.af = af; 
    this.router = router; 
    this.chapters = []; 
    this.verseStats = []; 
    this.nextChapter = 1; 
  }

  ngOnInit() {
    this.getChapter('Genesis'); 
  }

  onVerseSelect(verseKey) {
    this.router.navigate(['/verses', verseKey]);
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

}
