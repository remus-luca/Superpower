import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero, Superpower } from 'src/app/core/interfaces';
import { HeroService, SuperpowerService } from 'src/app/core/services';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { HeroStoreService } from 'src/app/store/hero-store.service';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.scss'],
})
export class HeroItemComponent implements OnInit {
  productForm: FormGroup;
  Unsuperpowers: Superpower[];

  @Input()
  hero: Hero;

  @Output()
  onDeleteSuperpower: EventEmitter<Superpower> = new EventEmitter();
  @Output() editSupehero: EventEmitter<any> = new EventEmitter();
  @Input()
  set allSuperpowers(data: Superpower[]) {
    if (data) {
      this.superpowers = data.filter((superpower) =>
        this.hero.superpowerIds.includes(superpower.id)
      );
    }
  }

  superpowers!: Superpower[];
  constructor(
    private heroesStore: HeroStoreService,
    private superpowerService: SuperpowerService,
    private heroservice: HeroService,
    private formbuilder: FormBuilder
  ) {}
  getUnsuperpower() {
    this.Unsuperpowers = this.superpowers.filter(
      (superpower) => !this.hero.superpowerIds.includes(superpower.id)
    );
    console.log(this.getUnsuperpower);
  }

  getSuperpowers(): void {
    if (this.hero.superpowerIds?.length) {
      this.superpowerService
        .getSuperpowersByIds(this.hero.superpowerIds)
        .subscribe((data) => (this.superpowers = data));
    } else {
      this.superpowers = [];
    }
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      realName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      superheroName: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
    this.getSuperpowers();
  }

  onDelete(superpowerId: number): void {
    const payload = {
      superpowerIds: this.hero.superpowerIds.filter((id) => id != superpowerId),
    };
    this.heroservice
      .updatedHeroSuperpowersIds(payload, this.hero.id)
      .subscribe((updatedHero: Hero) => {
        this.hero = updatedHero;
        this.getSuperpowers();
      });
  }

  deleteHero(hero: any) {
    this.heroservice.deleteHero(hero.id).subscribe(() => {
      this.heroesStore.deleteHero(hero.id);
    });
  }
  onEdit() {
    this.editSupehero.emit(this.hero);
  }
}
