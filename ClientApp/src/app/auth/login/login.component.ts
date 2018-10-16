import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginResp;
  public isLoading = false;
  isAuth;

  constructor(private authService: AuthService, private snackBarService: SnackbarService, private router: Router) { }

  ngOnInit() {
    if (this.authService.checkTokenExistance()) { this.router.navigate(['/myquizzes']); this.snackBarService.openSnackBar("You are already logined in", ''); }
  }

  login(form: NgForm) {
    this.isLoadingMethod(true);
    this.authService.login(form.value).subscribe(res => {

      let token = (<any>res).token;
      localStorage.setItem("jwt", token);

      this.isLoadingMethod(false);
      this.authService.authChange.next(true);
      this.router.navigate(['/myquizzes']);

    }, err => {
      this.authService.authChange.next(false);
      if (err.status == 401) { this.isLoadingMethod(false); this.snackBarService.openSnackBar("Email or password is incorrect", ''); }
      if (err.status == 400) { this.isLoadingMethod(false); this.snackBarService.openSnackBar("Bad request", ''); }
    });
  }

  isLoadingMethod(value: boolean) {
    this.isLoading = value;
  }
}
