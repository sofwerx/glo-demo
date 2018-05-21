import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MissionPlanningFirstFormComponent } from './mission-planning/mission-planning-first-form/mission-planning-first-form.component';
import { MatDialogRef } from '@angular/material/dialog/typings/dialog-ref';
import { MissonPlanningSercondFormComponent } from './mission-planning/misson-planning-sercond-form/misson-planning-sercond-form.component';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  missionDialogFirstRef: MatDialogRef<MissionPlanningFirstFormComponent>;
  missionDialogSecRef: MatDialogRef<MissonPlanningSercondFormComponent>;
  missionDialogOpen = false;

  @Output()
  onMenuItemClick = new EventEmitter();

  constructor(public dialog: MatDialog) {
  }

  openMissionPlanning() {
    if (!this.missionDialogOpen) {
      this.onMenuItemClick.emit();
      this.missionDialogFirstRef = this.dialog.open(MissionPlanningFirstFormComponent, {
        height: '530px',
        width: '350px',
      });
      this.missionDialogOpen = true;
      const close$ = this.missionDialogFirstRef.afterClosed().subscribe((firstFormValues) => {
        close$.unsubscribe();
        this.missionDialogOpen = false;
        if (firstFormValues) {
          this.missionDialogSecRef = this.dialog.open(MissonPlanningSercondFormComponent, {
            height: '530px',
            width: '350px',
            data: {
              firstFormValues,
            }
          });
          this.missionDialogSecRef.afterClosed().subscribe((result) => {
            if (result && result.shouldGoBack) {
              this.openMissionPlanning();
            }
          });
        }
      });


    }
  }
}
