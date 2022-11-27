import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Hero, Superpower } from 'src/app/core/interfaces';
import { HeroService, SuperpowerService } from 'src/app/core/services';
import { HeroStoreService } from 'src/app/store/hero-store.service';
import { HeroReactiveFormComponent } from '../hero-reactive-form/hero-reactive-form.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  power: Superpower;
  allSuperpowers: Superpower[];
  heroToBeEdited: Hero;
  constructor(
    private heroesStore: HeroStoreService,
    private superpowerService: SuperpowerService
  ) {}

  ngOnInit(): void {
    this.heroesStore.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
    });
    this.superpowerService
      .getSuperpowers()
      .subscribe((data) => (this.allSuperpowers = data));
  }

  editHero(hero: Hero) {
    this.heroToBeEdited = hero;
  }
  addSuperpower(power: Superpower) {
    // console.log(power);
    this.superpowerService
      .addSuperpower(power)
      .subscribe((power) => this.allSuperpowers.push(power));
  }
  onFormClose() {
    this.heroToBeEdited = null;
  }
}
