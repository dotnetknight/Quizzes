import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { QuestionInterface } from '../interfaces/question.interface';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addQuestion(questionData: QuestionInterface): Observable<Response> {
    return this.http.post<Response>('api/Question', questionData, {
      headers: this.authService.getHeaders()
    });
  }

  getQuestions(quizId): Observable<QuestionInterface[]> {
    return this.http.get<QuestionInterface[]>('api/Question/' + quizId, {
      headers: this.authService.getHeaders()
    });
  }

  checkQuestions(questionData: QuestionInterface): Observable<Response> {
    return this.http.post<Response>('api/Question/CheckQuestions', questionData, {
      headers: this.authService.getHeaders()
    });
  }

  updateQuestion(questionData: QuestionInterface): Observable<QuestionInterface> {
    return this.http.put<QuestionInterface>('api/Question', questionData, {
      headers: this.authService.getHeaders()
    });
  }
}
