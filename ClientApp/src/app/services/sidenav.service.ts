import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SidenavService {
    public openedVal;
    public modeVal;
    openedChange = new Subject<boolean>();
    modeChange = new Subject<string>();

    sidenavVals(openedValue, modeValue) {
        this.openedVal = this.openedChange.next(openedValue);
        this.modeVal = this.modeChange.next(modeValue);
    }
}
