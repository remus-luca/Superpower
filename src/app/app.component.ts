import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Hero } from 'src/app/core/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'superpower';
  shouldShowHeroes: boolean = true;
  // superpower = {
  //   name: 'ceva',
  //   icon: 'altceva',
  //   id: 3,
  // };
  // onSave() {
  //   this.shouldShowHeroes = false;
  //   setTimeout(() => {
  //     this.shouldShowHeroes = true;
  //   }, 0);
  // }
  // newHeroAdded!: Hero;
  // shouldRefreshHeroes: boolean = false;
  // onSave(newHero: Hero) {
  //   // setTimeout(() => {
  //   //   this.shouldRefreshHeroes = false;
  //   // }, 0);
  //   // this.shouldRefreshHeroes = true;
  //   this.newHeroAdded = newHero;
  // }
}
