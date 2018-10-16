import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterInterface } from '../../interfaces/register.interface';
import { NgForm } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SnackbarService } from '../../services';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  private myProfileList: RegisterInterface;
  public userName: Subject<string>;
  authResp;
  gotData;

  constructor(private authService: AuthService, private http: HttpClient, private snackBarService: SnackbarService) { }

  ngOnInit() {
    this.gotData = false;
    let token = this.authService.getToken();

    this.authService.myProfile().subscribe(resp => {
      this.myProfileList = resp;
      this.gotData = true;

    }, err => {
      if (err.status == 400) { this.snackBarService.openSnackBar("Bad request", ''); }
      if (err.status == 401) { this.snackBarService.openSnackBar("Unauthorized!", ''); }
      if (err.status == 404) { this.snackBarService.openSnackBar("User with this id can't be found", ''); }
    });
  }

  save(form: NgForm) {
    this.gotData = false;
    this.authService.updateUser(form.value).subscribe(res => {
      this.myProfileList = res;
      this.gotData = true;
      this.snackBarService.openSnackBar('Your data were successfully updated', '');
    }, err => {
      if (err.status == 400) { this.snackBarService.openSnackBar("Bad request", ''); }
      if (err.status == 401) { this.snackBarService.openSnackBar("Unauthorized!", ''); }
      if (err.status == 404) { this.snackBarService.openSnackBar("User with this id can't be found", ''); }
    });
  }
}
