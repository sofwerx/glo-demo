import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerLayerComponent } from './marker-layer.component';

describe('MarkerLayerComponent', () => {
  let component: MarkerLayerComponent;
  let fixture: ComponentFixture<MarkerLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
