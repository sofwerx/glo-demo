import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatDatepickerModule,
  MatFormFieldModule, MatTooltipModule, MatSnackBarModule, MatExpansionModule,
  MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MatTableModule, MatPaginatorModule, MatCheckboxModule
} from '@angular/material';
import { AngularCesiumModule } from 'angular-cesium';
import { MainMapComponent } from './main-map/main-map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MarkerLayerComponent } from './main-map/marker-layer/marker-layer.component';
import { MissionPlanningAccordionComponent } from './main-nav/mission-planning/mission-planning-accordion/mission-planning-accordion.component';
import { MealsFormComponent } from './forms/meals-form/meals-form.component';
import { MissionPlanningFirstFormComponent } from './forms/mission-planning-first-form/mission-planning-first-form.component';
import { MissonPlanningSercondFormComponent } from './forms/misson-planning-sercond-form/misson-planning-sercond-form.component';
import { EquipmentFormComponent } from './forms/equipment-form/equipment-form.component';
import { HttpClientModule } from '@angular/common/http';
import { EquipmentTableComponent } from './forms/equipment-form/equipment-table/equipment-table.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainMapComponent,
    MissionPlanningFirstFormComponent,
    MarkerLayerComponent,
    MissonPlanningSercondFormComponent,
    MissionPlanningAccordionComponent,
    MealsFormComponent,
    EquipmentFormComponent,
    EquipmentTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    AngularCesiumModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    HttpClientModule,
  ],
  providers: [{
    provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
      disableClose: true,
      hasBackdrop: false,
      panelClass: 'glo-dialog',
      position: {top: '50px', left: '50px'}
    }
  }],
  entryComponents: [MissionPlanningFirstFormComponent, MissonPlanningSercondFormComponent, MealsFormComponent, EquipmentFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
