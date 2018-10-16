import { Component, OnInit, Output, EventEmitter, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../services/sidenav.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  public isAuth = false;
  authSubscription: Subscription;
  sizeCheck: boolean = false;
  public modeVal: string = "side";
  public hasBackdropVal = true;
  public opened = true;
  public innerWidth: any;

  @Output() closeSidenav = new EventEmitter<void>();
  @Output() showOrCloseSidenav = new EventEmitter<void>();

  @ViewChild('sideNav') sideNav: MatSidenav;

  constructor(private sidenavService: SidenavService, private authService: AuthService, private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.sidenavService.sidenavVals(false, "over");
      this.sizeCheck = true;
    } else if (event.target.innerWidth > 500) {
      this.sizeCheck = false;
      this.sidenavService.sidenavVals(true, "side");
    }
  }

  ngOnInit() {
    if (this.authService.checkTokenExistance()) { this.isAuth = true; } else { this.isAuth = false; }
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onEmit() {
    this.showOrCloseSidenav.emit();
  }

  close() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 500) {
      this.onEmit();
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
