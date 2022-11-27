import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddPower: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddPower(): void {
    this.showAddPower = !this.showAddPower;
    this.subject.next(this.showAddPower);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
