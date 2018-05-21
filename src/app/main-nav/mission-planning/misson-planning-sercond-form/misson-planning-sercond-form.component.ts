import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'misson-planning-sercond-form',
  template: `
    <mat-divider></mat-divider>
    <form [formGroup]="missionSecondForm"  class="mission-form">
      <div class="center">
        <mat-form-field appearance="outline">
          <mat-label>Mission Name</mat-label>
          <input matInput placeholder="Enter Mission Name" formControlName="missionName">
        </mat-form-field>
      </div>
      <div class="mat-title" style="margin-bottom: 0">Phase 1</div>
      <div class="info-container">
        <div class="info-container-row">
          <div class="mat-body-2">Location: </div>
          <div class="mat-body-1">{{ missionSecondForm.get('location')?.value }}</div>
        </div>
        <div class="info-container-row">
          <div class="mat-body-2">Start: </div>
          <div class="mat-body-1">{{ moment(missionSecondForm.get('startDate')?.value).format('L') }}</div>
        </div>
        <div class="info-container-row">
          <div class="mat-body-2">End: </div>
          <div class="mat-body-1">{{ moment(missionSecondForm.get('endDate')?.value).format('L') }}</div>
        </div>
        <div class="info-container-row">
          <div class="mat-body-2">Duration (Days): </div>
          <div class="mat-body-1">{{ missionSecondForm.get('duration')?.value }}</div>
        </div>
        <div class="info-container-row">
          <div class="mat-body-2">Days to deployment: </div>
          <div class="mat-body-1">{{ missionSecondForm.get('daysToDeployment')?.value }}</div>
        </div>
      </div>
      <div>
        <mat-form-field appearance="outline">
          <mat-label>PAX (total)</mat-label>
          <input  type="number" matInput placeholder="Enter Pax amount" formControlName="pax">
        </mat-form-field>
      </div>
      <p class="mat-action-row">
        <button mat-raised-button color="accent" (click)="onBack.emit()" class="action-btn">Back</button>
        <button mat-raised-button color="accent" (click)="onSubmit()" class="action-btn">Submit request</button>
      </p>
    </form>
  `,
  styleUrls: ['./misson-planning-sercond-form.component.css']
})
export class MissonPlanningSercondFormComponent implements OnInit , OnChanges{

  @Input()
  missionFirstFormValues;
  @Output()
  onFormSubmit = new EventEmitter();
  @Output()
  onBack = new EventEmitter();

  missionSecondForm: FormGroup;
  moment = moment;

  constructor(private fb: FormBuilder,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    console.log(this.missionFirstFormValues);
    this.missionSecondForm = this.fb.group({
      missionName: {value: this.missionFirstFormValues.missionName,disabled: true},
      startDate: this.missionFirstFormValues.startDate,
      endDate: this.missionFirstFormValues.endDate,
      location: this.missionFirstFormValues.location,
      duration: '0',
      daysToDeployment: '0',

      pax: undefined,
    });

  }

  onSubmit(){
    this.snackBar.open('Mission was submitted successfully','ok',{ duration: 2000});
    this.onFormSubmit.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
  }

}
