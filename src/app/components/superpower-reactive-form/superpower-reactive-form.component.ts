import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SuperpowerService } from 'src/app/core/services';
import { SuperpowerStoreService } from 'src/app/store/superpower-store.service';
@Component({
  selector: 'app-superpower-reactive-form',
  templateUrl: './superpower-reactive-form.component.html',
  styleUrls: ['./superpower-reactive-form.component.scss'],
})
export class SuperpowerReactiveFormComponent implements OnInit {
  formSuperpower: FormGroup;
  editPower: any;

  constructor(
    private superpowerservice: SuperpowerService,
    private superpowerStore: SuperpowerStoreService
  ) {}

  ngOnInit(): void {
    this.formSuperpower = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      icon: new FormControl('', [Validators.required]),
    });
  }
  addSuperpower() {
    if (this.formSuperpower.valid) {
      this.superpowerservice.postPower(this.formSuperpower.value).subscribe({
        next: (res) => {
          this.formSuperpower.reset('save');
          this.superpowerStore.addNewSuperpower(res);
        },
      });
    } else {
      this.updateSuperpower();
    }
  }
  updateSuperpower() {
    this.superpowerservice
      .putPower(this.formSuperpower.value, this.editPower.id)
      .subscribe({
        next: (res: any) => {
          this.formSuperpower.reset('update');
        },
      });
  }
}
