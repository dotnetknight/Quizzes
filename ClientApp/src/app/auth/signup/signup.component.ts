import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  public regResp;
  public isLoading = false;

  constructor(private authService: AuthService, private snackBarService: SnackbarService, private router: Router) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    if (this.authService.checkTokenExistance()) {
      this.router.navigate(['/myquizzes']); this.snackBarService.openSnackBar("You are already logined in", '');
    }
  }

  register(form: NgForm) {
    this.isLoading = true;
    this.authService.register(form.value).subscribe(res => {
      this.snackBarService.openSnackBar("You have successfully registered!", "Login");
      this.router.navigate(['/login']);
    }, err => {
      this.isLoading = false;
      this.snackBarService.openSnackBar("Whoops! something went wrong :(", "");
      if (err.status == 409) { this.snackBarService.openSnackBar("Email is already registered", ""); }
    });
  }
}
