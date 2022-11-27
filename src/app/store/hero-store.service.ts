import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Hero } from '../core/interfaces';
import { HeroService } from '../core/services';

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService {
  public heroes$ = new BehaviorSubject<Hero[]>([]);
  private addHero$ = new Subject<Hero>();
  private updateHero$ = new Subject<Hero>();
  private deleteHero$ = new Subject<number>();

  constructor(private heroService: HeroService) {
    this.addHero$.subscribe((newHero: Hero) => {
      this.heroes$.next([...this.heroes$.getValue(), newHero]);
    });
    this.updateHero$.subscribe((updatedHero) => {
      const updatedHeroes: Hero[] = [];
      this.heroes$.getValue().forEach((hero) => {
        hero.id === updatedHero.id
          ? updatedHeroes.push(updatedHero)
          : updatedHeroes.push(hero);
      });
      this.heroes$.next(
        updatedHeroes
      );
    });

    this.deleteHero$.subscribe((idtoBeDeleted: number) => {
      this.heroes$.next(
        this.heroes$.getValue().filter((hero) => {
          return hero.id != idtoBeDeleted;
        })
      );
    });

    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes$.next(heroes);
    });
  }

  addNewHero(hero: Hero) {
    this.heroService.postHero(hero).subscribe((hero)=>this.addHero$.next(hero))
  }
  updateHero(payload: Hero, id: number) {
    this.heroService.putHero(payload, id).subscribe((updatedHero) => {
      this.updateHero$.next(updatedHero);
    });
  }
  deleteHero(id: number) {
    this.deleteHero$.next(id);
  }
}
