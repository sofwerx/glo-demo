import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatSort } from '@angular/material';
import { MealsFormComponent } from '../meals-form/meals-form.component';
import { EquipmentFormComponent } from '../equipment-form/equipment-form.component';

@Component({
  selector: 'misson-planning-sercond-form',
  template: `
    <div class="second-form-container">
      <h2 mat-dialog-title>Mission Planning</h2>
      <form [formGroup]="missionSecondForm" class="mission-form">
        <div class="center">
          <mat-form-field appearance="outline">
            <mat-label>Mission Name</mat-label>
            <input matInput placeholder="Enter Mission Name" formControlName="missionName">
          </mat-form-field>
        </div>
        <div class="mat-title" style="margin-bottom: 0">Phase 1</div>
        <div class="info-container">
          <div class="info-container-row">
            <div class="mat-body-2">Location:</div>
            <div class="mat-body-1">{{ missionSecondForm.get('location')?.value }}</div>
          </div>
          <div class="info-container-row">
            <div class="mat-body-2">Start:</div>
            <div class="mat-body-1">{{ moment(missionSecondForm.get('startDate')?.value).format('L') }}</div>
          </div>
          <div class="info-container-row">
            <div class="mat-body-2">End:</div>
            <div class="mat-body-1">{{ moment(missionSecondForm.get('endDate')?.value).format('L') }}</div>
          </div>
          <div class="info-container-row">
            <div class="mat-body-2">Duration (Days):</div>
            <div class="mat-body-1">{{ missionSecondForm.get('duration')?.value }}</div>
          </div>
          <div class="info-container-row">
            <div class="mat-body-2">Days to deployment:</div>
            <div class="mat-body-1">{{ missionSecondForm.get('daysToDeployment')?.value }}</div>
          </div>
        </div>
        <mat-divider></mat-divider>
        <div>
          <mat-form-field>
            <mat-label>PAX (total)</mat-label>
            <input type="number" required matInput placeholder="Enter Pax amount" formControlName="pax">
          </mat-form-field>
        </div>
        <div class="forms-buttons">
          <button mat-raised-button color="primary" class="form-btn"
                  [disabled]="!missionSecondForm.get('pax').valid"
                  (click)="openMealsFrom()">Logistics Requirements
          </button>
          <button mat-raised-button color="primary" class="form-btn" style="margin-top: 5px"
                  (click)="openEquipmentFrom()">Equipment
          </button>
        </div>
      </form>
      <div style="flex-grow: 1"></div>
      <mat-dialog-actions>
        <button mat-raised-button color="accent" [mat-dialog-close]="{shouldGoBack: true}">Back</button>
        <button mat-raised-button color="accent" (click)="onSubmit()">Submit Request</button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./misson-planning-sercond-form.component.css']
})
export class MissonPlanningSercondFormComponent implements OnInit, OnChanges {

  moment = moment;
  missionSecondForm: FormGroup;

  constructor(private fb: FormBuilder,
              public snackBar: MatSnackBar,
              private dialog: MatDialog,
              private self: MatDialogRef<MissonPlanningSercondFormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { firstFormValues: any }) {
  }

  ngOnInit() {
    this.createForm();
  }

  openMealsFrom() {
    this.dialog.open(MealsFormComponent, {
      height: '500px',
      width: '700px',
      position: {top: '50px', left: '450px'},
      data: {
        duration: this.missionSecondForm.get('duration').value,
        deploymentDays: this.missionSecondForm.get('daysToDeployment').value,
        pax: this.missionSecondForm.get('pax').value,
      }
    });
  }

  openEquipmentFrom() {
    this.dialog.open(EquipmentFormComponent, {
      height: '600px',
      width: '800px',
      position: {top: '50px', left: '450px'},
    });
  }

  createForm() {
    const missionFirstFormValues = this.data.firstFormValues;
    this.missionSecondForm = this.fb.group({
      missionName: missionFirstFormValues.missionName,
      startDate: missionFirstFormValues.startDate,
      endDate: missionFirstFormValues.endDate,
      location: missionFirstFormValues.location || 'didn\'t set',
      duration: moment(missionFirstFormValues.endDate).diff(missionFirstFormValues.startDate, 'day'),
      daysToDeployment: moment(missionFirstFormValues.startDate).diff(moment(), 'days') + 1,
      pax: undefined,
    });

  }

  onSubmit() {
    this.snackBar.open('Mission was submitted successfully', 'ok', {duration: 2000});
    this.self.close();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
  }

}
