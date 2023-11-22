import { Component, OnInit } from '@angular/core';
import quizQuestions from '../../../assets/data/quizQuestions.json'

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  quizTitle: string = "";

  questionIndex: number = 0;
  questionIndexMax: number = 0;
  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = "";

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (quizQuestions) {
      this.finished = false;
      this.quizTitle = quizQuestions.title;

      this.questions = quizQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndexMax = this.questions.length;
    }
  }

  userChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex += 1;

    if (this.questionIndexMax > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizQuestions.results[finalAnswer as keyof typeof quizQuestions.results];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous) > arr.filter(item => item === current)) {
        return previous
      } else {
        return current
      }
    })
    return result;
  }

}
