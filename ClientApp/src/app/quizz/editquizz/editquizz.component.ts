import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService, SnackbarService, QuestionService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryInterface } from '../../interfaces/category.interface';
import { QuizInterface } from '../../interfaces/quizz.interface';
import { QuestionInterface } from '../../interfaces/question.interface';
import { Subscription, empty } from 'rxjs';

@Component({
  selector: 'app-editquizz',
  templateUrl: './editquizz.component.html',
  styleUrls: ['./editquizz.component.css']
})
export class EditquizzComponent implements OnInit, OnDestroy {
  quizId;
  step = 0;
  categoryList: CategoryInterface;
  quizList: QuizInterface;
  questionsList: QuestionInterface[];
  isLoading = true;
  haveQuestions: boolean = false;
  haveQuiz: boolean = false;
  gotQuestions: boolean = false;
  quizSubs: Subscription;
  questionsSubs: Subscription;
  catSubs: Subscription;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private quizService: QuizService, private questionService: QuestionService, private router: Router, private route: ActivatedRoute, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.loadData();
  }
  
  editQuestion(form: NgForm) {
    this.isLoading = true;
    this.haveQuiz = false;
    this.questionsSubs = this.questionService.updateQuestion(form.value).subscribe(resp => {
      this.loadData();
      this.snackbarService.openSnackBar("Question was successfully updated!", '');
    });
  }

  editQuiz(form: NgForm) {
    this.isLoading = true;
    this.haveQuiz = false;
    this.quizSubs =  this.quizService.editQuiz(form.value).subscribe(resp => {
      this.loadData();
      this.snackbarService.openSnackBar("Quiz was successfully updated!", '');
    });
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

  loadData() {
    this.isLoading = true;
    this.haveQuestions = false;
    this.haveQuiz = false;
    this.gotQuestions = false;
    this.step = 0;

    this.route.params.subscribe(params => {
      this.quizId = params['id'];
    });
    this.catSubs = this.quizService.getCategories().subscribe(cat => {
      this.categoryList = cat;

      this.questionsSubs = this.questionService.getQuestions(this.quizId).subscribe(questions => {
        this.questionsList = questions;

        if (this.questionsList.length > 0) { this.haveQuestions = true; this.gotQuestions = true; }
      }, err => {
      });

      this.quizSubs = this.quizService.getQuizById(this.quizId).subscribe(quiz => {
        this.quizList = quiz;

        if (!this.isEmptyObject(this.quizList)) {
          this.haveQuiz = true;
        } else { this.haveQuiz = false; this.noQuizMsg(); }

        this.isLoading = false;
      }, err => {
        this.noQuizMsg();
      });

    }, err => {
      this.noQuizMsg();
    });
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  noQuizMsg() {
    this.snackbarService.openSnackBar("Quiz with this Id can't be found", '');
    this.router.navigate(['/myquizzes']);
  }

  ngOnDestroy() {
    this.catSubs.unsubscribe();
    this.questionsSubs.unsubscribe();
    this.quizSubs.unsubscribe();
  }
}
