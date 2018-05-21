import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import * as mgrs from 'mgrs';
import { MarkersLocationsService } from '../../../main-map/marker-layer/markers-locations.service';
import { MapsManagerService } from 'angular-cesium';
import { map } from 'rxjs/operators';
import { MatDialogRef, MatSnackBar } from '@angular/material';

declare var Cesium;
const MGRS_PRECISION = 3;

@Component({
  selector: 'mission-planning-first-form',
  template: `
    <h2 mat-dialog-title>Mission Planning</h2>
    <form [formGroup]="missionForm" class="mission-form">
      <div>
        <mat-form-field appearance="outline">
          <mat-label>Mission Name</mat-label>
          <input #missionName matInput placeholder="Enter Mission Name" formControlName="missionName">
        </mat-form-field>
      </div>
      <div class="mat-subheading-2">Phase 1 Time line</div>
      <mat-form-field>
        <input matInput [min]="minDate" [matDatepicker]="startPicker" placeholder="Start date"
               [formControlName]="'startDate'">
        <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
        <mat-datepicker #startPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <input matInput [min]="minDate" [matDatepicker]="endPicker" placeholder="End date">
        <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field (click)="chooseLocation()">
        <input matInput placeholder="Location (MGRS)" [type]="'text'" [formControlName]="'location'">
        <mat-icon matSuffix [color]="locationChoosing ? 'primary' : ''">location_on</mat-icon>
        <mat-hint>Click to start location picking</mat-hint>
      </mat-form-field>
      <div class="add-phase-row">
        <button matTooltip="Add Phase" mat-mini-fab color="primary">
          <mat-icon matSuffix>add</mat-icon>
        </button>
      </div>
      <mat-dialog-actions>
        <button mat-raised-button color="accent" mat-dialog-close>Cancel</button>
        <button mat-raised-button color="accent" (click)="onSubmit()">Next</button>
      </mat-dialog-actions>
    </form>
  `,
  styleUrls: ['./mission-planning-first-form.component.css']
})
export class MissionPlanningFirstFormComponent implements OnInit, OnDestroy, AfterViewInit {

  missionForm: FormGroup;
  locationChoosing = false;
  minDate = new Date(2000, 0, 1);

  @Output()
  onFormSubmit = new EventEmitter();

  @Output()
  onCancel = new EventEmitter();

  @ViewChild('missionName')
  private missionName: ElementRef;

  constructor(private fb: FormBuilder,
              private markersLocationsService: MarkersLocationsService,
              private mapManager: MapsManagerService,
              public snackBar: MatSnackBar,
              private self: MatDialogRef<MissionPlanningFirstFormComponent>) {
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
    this.markersLocationsService.stopListenToClicks();
    const missionModel = this.missionForm.value;
    this.self.close(missionModel);
  }


  convertToMgrs(cartesian3) {
    const geoConverter = this.mapManager.getMap().getCoordinateConverter();
    const cartographicPosition = geoConverter.cartesian3ToCartographic(cartesian3);
    const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
    const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
    const mgrs_str = mgrs.forward([longitude, latitude], MGRS_PRECISION);

    return `${mgrs_str.substr(0, 3)} ${mgrs_str.substr(3, 2)} ${mgrs_str.substr(5, 3)} ${mgrs_str.substr(8)}`;
  }

  chooseLocation() {
    if (!this.locationChoosing) {
      this.locationChoosing = true;
      this.snackBar.open('Click on the globe to pick a location', 'OK', {
        duration: 3000,
      });
      const markerLocations$ = this.markersLocationsService.startMapListenToClicks();
      markerLocations$
        .pipe(map(cartesian3 => this.convertToMgrs(cartesian3)))
        .subscribe(mgrs => {
          this.missionForm.patchValue({
            location: mgrs
          });
        });
    } else {
      this.locationChoosing = false;
      this.markersLocationsService.stopListenToClicks();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.markersLocationsService.stopListenToClicks();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>this.missionName.nativeElement.focus(),0);
  }
}
