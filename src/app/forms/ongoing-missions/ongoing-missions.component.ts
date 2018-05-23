import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { StateService } from '../../common/state/state.service';
import { Mission } from '../../common/state/types';

@Component({
  selector: 'ongoing-missions',
  template: `
    <div>
      <div *ngIf="missions.length !== 0">
        <mat-toolbar color="primary" class="toolbar-ongoing-missions">
          Ongoing missions
        </mat-toolbar>
        <mat-accordion class="example-headers-align">
          <mat-expansion-panel *ngFor="let mission of missions ; index as i" [expanded]="step === i" (opened)="setStep(i)">
            <mat-expansion-panel-header>
              <mat-panel-title>
                Mission No. {{i+1}}
              </mat-panel-title>
              <mat-panel-description>
                {{mission.missionName}}
              </mat-panel-description>
            </mat-expansion-panel-header>
                <p>Days to deployment: {{mission.daysToDeployment}}</p>
                <p>More mission data...</p>
            <mat-action-row>
              <button mat-button color="warn" (click)="setStep(undefined)">Cancel</button>
            </mat-action-row>
          </mat-expansion-panel>
        </mat-accordion>
      </div>

    </div>
  `,
  styleUrls: ['./ongoing-missions.component.css']
})
export class OngoingMissionsComponent implements OnInit, OnChanges {

  missions: Mission[] = [];

  constructor(private state: StateService) {
  }

  @Input()
  show;

  @Output()
  onCancel = new EventEmitter();

  showAccordion = true;
  step = null;

  setStep(index: number) {
    this.step = index;
  }


  ngOnInit() {
    this.state.missions$.subscribe(missions => {
      this.missions = missions;
    });
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
