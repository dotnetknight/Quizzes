import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { CategoryInterface } from '../interfaces/category.interface';
import { QuizInterface } from '../interfaces/quizz.interface';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCategories(): Observable<CategoryInterface> {
    return this.http.get<CategoryInterface>('api/Categories', {
      headers: this.authService.getHeaders()
    });
  }

  addQuiz(quizData: QuizInterface): Observable<Response> {
    return this.http.post<Response>('api/Quiz/AddQuiz', quizData, {
      headers: this.authService.getHeaders()
    });
  }

  getMyQuizzes(): Observable<QuizInterface[]> {
    return this.http.get<QuizInterface[]>('api/Quiz/MyQuizzes', {
      headers: this.authService.getHeaders()
    });
  }

  getAllQuizzes(): Observable<QuizInterface[]> {
    return this.http.get<QuizInterface[]>('api/Quiz', {
      headers: this.authService.getHeaders()
    });
  }

  getQuizById(id): Observable<QuizInterface> {
    return this.http.get<QuizInterface>('api/Quiz/' + id, {
      headers: this.authService.getHeaders()
    });
  }

  editQuiz(quizData: QuizInterface): Observable<QuizInterface[]> {
    return this.http.put<QuizInterface[]>('api/Quiz', quizData, {
      headers: this.authService.getHeaders()
    });
  }

  deleteQuiz(quizId): Observable<Response> {
    return this.http.delete<Response>('api/Quiz/Delete/' + quizId, {
      headers: this.authService.getHeaders()
    });
  }
}
