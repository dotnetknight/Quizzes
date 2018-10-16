import { Component, OnInit } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /*
     private _openedVal: string = "nika";
  public get openedVal(): string {
    return this._openedVal;
  }
  public set openedVal(value: string) {
    this._openedVal = value;
  }
   */
  public openedVal;
  public modeVal;
  public innerWidth: any;

  openedSubs: Subscription;
  modesubs: Subscription;

  constructor(private sidenavService: SidenavService, private authService: AuthService) {
    this.openedSubs = this.sidenavService.openedChange.subscribe(opnChange => {
      this.openedVal = opnChange;
    });
    this.modesubs = this.sidenavService.modeChange.subscribe(modSbs => {
      this.modeVal = modSbs;
    });
  }

  ngOnInit() {
    this.authService.tokenChecks();

    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 500) {
      this.modeVal = "over";
      this.openedVal = false;
    } else {
      this.modeVal = "side";
      this.openedVal = true;
    }
  }
}
