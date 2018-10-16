import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { CategoryInterface } from '../../interfaces/category.interface';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addquizz',
  templateUrl: './addquizz.component.html',
  styleUrls: ['./addquizz.component.css']
})
export class AddquizzComponent implements OnInit {
  categoryList: CategoryInterface;
  isLoading = true;

  constructor(private quizService: QuizService, private router: Router, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.quizService.getCategories().subscribe(cat => {
      this.categoryList = cat;
      this.isLoading = false;
    }, err => {
      console.log(err);
    });
  }

  addQuiz(form: NgForm) {
    this.isLoading = true;
    this.quizService.addQuiz(form.value).subscribe(resp => {
      this.snackbarService.openSnackBar("New quiz successfully added!", '');
      this.router.navigate(['/quiz']);
      this.isLoading = false;
    }, err => {
      console.log(err);
    })
  }
}
