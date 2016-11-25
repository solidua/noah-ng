import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.styl']
})
export class QuestionAnswerComponent implements OnInit {
  @Input() answer

  constructor() { }

  ngOnInit() {
  }

}
