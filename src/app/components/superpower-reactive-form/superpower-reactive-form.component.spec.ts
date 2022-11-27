import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperpowerReactiveFormComponent } from './superpower-reactive-form.component';

describe('SuperpowerReactiveFormComponent', () => {
  let component: SuperpowerReactiveFormComponent;
  let fixture: ComponentFixture<SuperpowerReactiveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperpowerReactiveFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperpowerReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
