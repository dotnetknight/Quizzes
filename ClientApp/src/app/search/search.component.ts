import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../services';
import { QuizInterface } from '../interfaces/quizz.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CategoryInterface } from '../interfaces/category.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  isLoading = true;
  quizList: QuizInterface[];
  quizSubs: Subscription;

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.quizSubs = this.quizService.getAllQuizzes().subscribe(quizzes => {

      this.quizList = quizzes;
      this.isLoading = false;

    }, err => { console.log(err); })
  }

  playQuiz(quizId) {
    this.router.navigate(['/play/' + quizId]);
  }

  search(form: NgForm) {
    console.log(form.value);
  }

  ngOnDestroy() {
    this.quizSubs.unsubscribe();
  }
}
