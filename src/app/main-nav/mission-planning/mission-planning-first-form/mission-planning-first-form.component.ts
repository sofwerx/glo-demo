import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import * as moment from "moment";
import * as mgrs from 'mgrs';
import { MarkersLocationsService } from "../../../main-map/marker-layer/markers-locations.service";

console.log(mgrs);

@Component({
  selector: 'mission-planning-first-form',
  template: `
    <mat-divider></mat-divider>
    <form [formGroup]="missionForm" (ngSubmit)="onSubmit()" class="mission-form">
      <div>
        <mat-form-field appearance="outline">
          <mat-label>Mission Name</mat-label>
          <input matInput placeholder="Enter Mission Name" formControlName="missionName">
        </mat-form-field>
      </div>
      <div class="mat-subheading-2">Phase 1 Time line</div>
      <mat-form-field>
        <input matInput [matDatepicker]="startPicker" placeholder="Start date" [formControlName]="'startDate'">
        <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
        <mat-datepicker #startPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <input matInput [matDatepicker]="endPicker" placeholder="End date">
        <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Location" [type]="'text'" [formControlName]="'location'">
        <mat-icon matSuffix (click)="chooseLocation()">location_on</mat-icon>
        <mat-hint>Click On the map too choose location</mat-hint>
      </mat-form-field>
      <div class="add-phase-row">
        <button matTooltip="Add Phase" mat-mini-fab color="primary">
          <mat-icon matSuffix (click)="chooseLocation()">add</mat-icon>
        </button>
      </div>
      <p>
        <button mat-raised-button color="accent">Close</button>
        <button mat-raised-button color="accent">Next</button>
      </p>
    </form>
  `,
  styleUrls: ['./mission-planning-first-form.component.css']
})
export class MissionPlanningFirstFormComponent implements OnInit {

  missionForm: FormGroup;

  constructor(private fb: FormBuilder, private markersLocationsService: MarkersLocationsService) {
    this.createForm();


  }

  createForm() {
    this.missionForm = this.fb.group({
      missionName: '',
      startDate: moment().toISOString(),
      endDate: undefined,
      location: undefined,
      phase: this.fb.array([]),
    });
  }

  onSubmit() {
    const missionModel = this.missionForm.value;
    // TODO open second stage
  }



  chooseLocation() {

    const markerLocations$ = this.markersLocationsService.startMapListenToClicks();
    markerLocations$.subscribe(cartesian3 => {
      this.missionForm.patchValue({
        location: cartesian3
      });
    });
  }

  ngOnInit() {
  }

}
