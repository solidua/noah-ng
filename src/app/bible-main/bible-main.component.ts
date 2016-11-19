import { Component, OnInit, Pipe } from '@angular/core';
import { AngularFire, FirebaseListObservable} from 'angularfire2'; 

@Component({
  selector: 'app-bible-main',
  templateUrl: './bible-main.component.html',
  styleUrls: ['./bible-main.component.styl']
})
export class BibleMainComponent implements OnInit {
  chapters: FirebaseListObservable<any>[]; 
  verseStats: FirebaseListObservable<any>[]; 

  constructor(af: AngularFire) { 
    this.chapters = []; 
    this.chapters.push(af.database.list('/translations/web/verses', { 
      query: { 
        orderByChild: 'chapter', 
        equalTo: 1
      }
    })); 

    this.verseStats = []; 
    this.verseStats.push(af.database.list('/verseStats', {
      query: {
        orderByChild: 'chapter', 
        equalTo: 1
      }
    }));

  }

  ngOnInit() {
  }
}

@Pipe({
  name: 'first'
})

export class First {
  transform(val, args) {
    if (val === null) return val; 
    return val[0]; 
  }
}