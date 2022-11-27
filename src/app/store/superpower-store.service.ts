import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Superpower } from '../core/interfaces';
import { SuperpowerService } from '../core/services';

@Injectable({
  providedIn: 'root',
})
export class SuperpowerStoreService {
  public superpower$ = new BehaviorSubject<Superpower[]>([]);
  private addSuperpower$ = new Subject<Superpower>();

  constructor(private superpowerservice: SuperpowerService) {
    this.addSuperpower$.subscribe((newSuperpower: Superpower) => {
      this.superpower$.next([...this.superpower$.getValue(), newSuperpower]);
    });
    this.superpowerservice.getSuperpowers().subscribe((superpower) => {
      this.superpower$.next(superpower);
    });
  }

  addNewSuperpower(superpower: Superpower) {
    this.addSuperpower$.next(superpower);
    console.log(this.addSuperpower$);
  }
}
