import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { SnackbarService } from '../services';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { QuizInterface } from '../interfaces/quizz.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'actions'];
  dataSource: MatTableDataSource<QuizInterface>;
  dataList: QuizInterface[];
  isLoading = true;
  gotData = false;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private quizService: QuizService, private snackbarService: SnackbarService, private router: Router) { }

  ngOnInit() {
    this.getQuizzes();
  }

  getQuizzes() {
    this.quizService.getMyQuizzes().subscribe(resp => {
      this.dataList = resp;
      this.dataSource = new MatTableDataSource(this.dataList);
      this.isLoading = false;
      this.gotData = true;
    }, err => {
      this.snackbarService.openSnackBar(err, '');
    });
  }

  playQuiz(quizId) {
    this.router.navigate(['/play/' + quizId]);
  }

  addQuiz() {
    this.router.navigate(['/addquiz']);
  }

  editQuiz(quizId) {
    this.router.navigate(['/editquiz/' + quizId]);
  }

  deleteQuiz(quizId) {
    var ans = confirm("Do you want to delete quiz with Id: " + quizId + "?");
    if (ans) {
    this.quizService.deleteQuiz(quizId).subscribe(resp => {
        this.snackbarService.openSnackBar("Quiz successfully deleted", '');
        this.getQuizzes();
      }, err => {
        console.log(err);
      });
    }
  }
  
}
