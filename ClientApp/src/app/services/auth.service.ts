import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginDetails } from '../interfaces/login.interface';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterInterface } from '../interfaces/register.interface';

@Injectable()
export class AuthService {
  public tokenExpVal: any;
  public userName: any;
  tokenExists;
  authChange = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private snackService: SnackbarService) { }

  register(regData: RegisterInterface): Observable<Response> {
    return this.http.post<Response>('api/Users/Register', regData);
  }

  login(loginData: LoginDetails): Observable<Response> {
    return this.http.post<Response>('api/Users/Login', loginData);
  }

  myProfile(): Observable<RegisterInterface> {
    return this.http.get<RegisterInterface>('api/Users/MyProfile', {
      headers: this.getHeaders()
    });
  }

  updateUser(user: RegisterInterface): Observable<RegisterInterface> {
    return this.http.put<RegisterInterface>('api/Users/UpdateProfile', user, {
      headers: this.getHeaders()
    });
  }

  getHeaders() {
    const headers = new HttpHeaders().set('content-type', 'application/json').set("Authorization", "Bearer " + this.getToken());
    return headers;
  }

  checkTokenExistance() {
    if (localStorage.getItem('jwt')) { this.tokenExists = true; this.authChange.next(true); } else { this.authChange.next(false); this.tokenExists = false; }
    return this.tokenExists;
  }

  tokenChecks() {
    var token = this.getToken();

    if (token) {
      const jwtHelper = new JwtHelperService();
      const isTokenExpired = jwtHelper.isTokenExpired(token);
      this.tokenExpVal = isTokenExpired;

      if (this.tokenExpVal) { this.logout(); }
    }
  }

  getToken() {
    return localStorage.getItem("jwt");
  }

  logout() {
    localStorage.removeItem("jwt");
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
}
