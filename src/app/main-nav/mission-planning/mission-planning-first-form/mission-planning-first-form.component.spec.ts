import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionPlanningFirstFormComponent } from './mission-planning-first-form.component';

describe('MissionPlanningFirstFormComponent', () => {
  let component: MissionPlanningFirstFormComponent;
  let fixture: ComponentFixture<MissionPlanningFirstFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionPlanningFirstFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionPlanningFirstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
