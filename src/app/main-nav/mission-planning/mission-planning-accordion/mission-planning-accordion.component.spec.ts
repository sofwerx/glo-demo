import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionPlanningAccordionComponent } from './mission-planning-accordion.component';

describe('MissionPlanningAccordionComponent', () => {
  let component: MissionPlanningAccordionComponent;
  let fixture: ComponentFixture<MissionPlanningAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionPlanningAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionPlanningAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
