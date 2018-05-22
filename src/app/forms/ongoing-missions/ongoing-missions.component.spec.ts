import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingMissionsComponent } from './ongoing-missions.component';

describe('OngoingMissionsComponent', () => {
  let component: OngoingMissionsComponent;
  let fixture: ComponentFixture<OngoingMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
