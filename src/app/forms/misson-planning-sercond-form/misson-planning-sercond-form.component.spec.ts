import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissonPlanningSercondFormComponent } from './misson-planning-sercond-form.component';

describe('MissonPlanningSercondFormComponent', () => {
  let component: MissonPlanningSercondFormComponent;
  let fixture: ComponentFixture<MissonPlanningSercondFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissonPlanningSercondFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissonPlanningSercondFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
