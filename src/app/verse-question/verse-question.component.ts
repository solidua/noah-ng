import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { Question } from '../question'; 

@Component({
  selector: 'app-verse-question',
  templateUrl: './verse-question.component.html',
  styleUrls: ['./verse-question.component.styl']
})
export class VerseQuestionComponent implements OnInit {
  @Input() question: Question; 

  constructor(private router: Router) { }

  ngOnInit() {
  
  }

  onQuestionSelect() {
    this.router.navigate(['/questions']);    
  }
}
