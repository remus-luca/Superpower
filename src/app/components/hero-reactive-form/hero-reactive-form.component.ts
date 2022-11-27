import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Hero } from 'src/app/core/interfaces';
import { HeroService } from 'src/app/core/services';
import { HeroStoreService } from 'src/app/store/hero-store.service';

enum formSubmitState {
  ADD = 'Add Heroes',
  EDIT = 'Update Hero',
}
@Component({
  selector: 'app-hero-reactive-form',
  templateUrl: './hero-reactive-form.component.html',
  styleUrls: ['./hero-reactive-form.component.scss'],
})
export class HeroReactiveFormComponent implements OnInit, OnChanges {
  productForm: FormGroup;

  @Input() heroToBeEdited: Hero;
  submitButtonText: string = formSubmitState.ADD;
  @Output() close = new EventEmitter<void>();
  constructor(private heroesStore: HeroStoreService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroToBeEdited'].currentValue) {
      this.submitButtonText = formSubmitState.EDIT;
      this.productForm.patchValue({
        superheroName: this.heroToBeEdited.superheroName,
        realName: this.heroToBeEdited.realName,
        imageUrl: this.heroToBeEdited.imageUrl,
      });
    } else {
      this.submitButtonText = formSubmitState.ADD;
    }
    if (changes['visible'] && changes['visible'].currentValue === false) {
      this._resetForm();
    }
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      // id: ['', Validators.required],
      superheroName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      realName: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
  }
  addHero() {
    if (this.heroToBeEdited) {
      this.heroesStore.updateHero(
        this.productForm.value,
        this.heroToBeEdited.id
      );
    } else {
      this.heroesStore.addNewHero(this.productForm.value);
    }
    this._resetForm();
  }
  onCloseModal() {
    this.close.emit();
    this._resetForm();
  }
  private _resetForm() {
    this.productForm.reset({
      superheroName: '',
      realName: '',
      imageUrl: '',
    });
  }
}
