import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuizInterface } from '../../interfaces/quizz.interface';
import { NgForm } from '@angular/forms';
import { QuestionService, SnackbarService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  quizList: QuizInterface[];
  isLoading = true;

  constructor(private quizService: QuizService, private questionService: QuestionService, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.quizService.getMyQuizzes().subscribe(quizzes => {
      this.quizList = quizzes;
      this.isLoading = false;
    }, err => {
      console.log(err);
    })
  }

  addQuestion(form: NgForm) {
    this.isLoading = true;

    this.questionService.addQuestion(form.value).subscribe(resp => {
      this.isLoading = false;
      this.snackbarService.openSnackBar("New question was successfully added", '');
      form.reset();
    }, err => { console.log(err); });
  }

}
