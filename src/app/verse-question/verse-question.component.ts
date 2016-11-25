import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-verse-question',
  templateUrl: './verse-question.component.html',
  styleUrls: ['./verse-question.component.styl']
})
export class VerseQuestionComponent implements OnInit {
  @Input() question

  constructor(private router: Router) { }

  ngOnInit() {
  
  }

  onQuestionSelect() {
    console.log(this.question.$key); 
    this.router.navigate(['/questions', this.question.$key]);    
  }
}
