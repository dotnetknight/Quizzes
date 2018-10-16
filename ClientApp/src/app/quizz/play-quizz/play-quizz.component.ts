import { Component, OnInit } from '@angular/core';
import { SnackbarService, QuestionService } from '../../services';
import { QuizInterface } from '../../interfaces/quizz.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionInterface } from '../../interfaces/question.interface';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-quizz',
  templateUrl: './play-quizz.component.html',
  styleUrls: ['./play-quizz.component.css']
})
export class PlayQuizzComponent implements OnInit {
  cardTitle: string = "No questions were found in this quiz, add some questions or choose another!";
  isLoading = true;
  end = false;
  haveQuizzes = true;
  noQuestions: boolean = false;
  gameFinished: boolean = false;
  quizId;
  questionList: QuestionInterface[];
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
    if (this.step == this.questionList.length - 1) { this.end = true; }
  }

  prevStep() {
    this.step--;
  }

  constructor(private questionService: QuestionService, private router: Router, private route: ActivatedRoute, private snackBarService: SnackbarService, private dialog: MatDialog) { }

  ngOnInit() {
    this.play();
  }

  play() {
    this.isLoading = true;
    this.step = 0;
    this.end = false;
    this.gameFinished = false;
    this.haveQuizzes = true;

    this.route.params.subscribe(params => {
      this.quizId = params['quizId'];
    });

    this.questionService.getQuestions(this.quizId).subscribe(resp => {
      this.questionList = resp;

      if (this.questionList.length > 0) {
        if (this.questionList.length == 1) { this.end = true; }
        this.questionList.forEach(q => {
          q.answers = [q.correctAnswer, q.answer1, q.answer2, q.answer3]
          shuffle(q.answers)
        });

        shuffle(this.questionList);

        this.isLoading = false;
        this.haveQuizzes = true;

      } else { this.isLoading = false; this.haveQuizzes = false; this.noQuestions = true; this.snackBarService.openSnackBar("Can't load Questions", ''); }
    }, err => {
      console.log(err);
      if (err.status == 404) { this.snackBarService.openSnackBar("Bad request", ''); }
    })
  }

  addQuestion() {
    this.router.navigate(['/addquestions']);
  }

  myQuizzes() {
    this.router.navigate(['/myquizzes'])
  }

  searchQuizzes() {
    this.router.navigate(['/search']);
  }

  finish() {
    var correct = 0;
    this.questionList.forEach(q => {
      if (q.correctAnswer == q.selectedAnswer)
        correct++
    });


    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        score: correct
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nextStep();
        this.gameFinished = true;
        this.haveQuizzes = false;
        this.cardTitle = "You have completed this quiz!";
      }
    });
  }
}

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
