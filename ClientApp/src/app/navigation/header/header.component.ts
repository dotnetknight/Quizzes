import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MyprofileComponent } from '../../auth/myprofile/myprofile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth = false;
  authSubscription: Subscription;
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.checkTokenExistance()) { this.isAuth = true; } else { this.isAuth = false; }
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
