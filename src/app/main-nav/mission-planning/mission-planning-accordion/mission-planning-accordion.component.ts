import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'mission-planning-accordion',
  templateUrl: './mission-planning-accordion.component.html',
  styleUrls: ['./mission-planning-accordion.component.css']
})
export class MissionPlanningAccordionComponent implements OnInit, OnChanges {

  @Input()
  show;

  @Output()
  onCancel = new EventEmitter();

  showAccordion = false;
  step = null;
  missionFirstValues;

  setStep(index: number) {
    this.step = index;
  }

  cancelFrom() {
    this.step = null;
    setTimeout(() => this.onCancel.emit(), 150);
  }

  backToFirst() {
    this.step = 0;
  }

  missionPlanningFirstSubmit(values) {
    this.missionFirstValues = values;
    this.step = 1;
  }

  missionPlanningSecondSubmit(values) {
    this.cancelFrom();
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['show'] !== undefined) {
      this.showAccordion = changes['show'].currentValue;
      if (this.showAccordion) {
        setTimeout(() => this.step = 0, 0);
      } else {
        this.step = undefined;
      }
    }
  }

}
