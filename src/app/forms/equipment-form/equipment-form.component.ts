import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentDataRow, EquipmentFileTypes, EquipmentService } from './equipment.service';
import { MealTableRow } from '../meals-form/meals.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'equipment-form',
  template: `
    <div class="form-container">
      <h2 mat-dialog-title>Equipment</h2>
      <equipment-table [dataTable]="shootData" [searchText]="'Search Shoot'"></equipment-table>
      <equipment-table [dataTable]="moveData" [searchText]="'Search Move'"></equipment-table>
      <equipment-table [dataTable]="commData" [searchText]="'Search Communicate'"></equipment-table>
      <div style="flex-grow: 1"></div>
      <mat-dialog-actions style="display: block">
        <button mat-raised-button color="accent" [mat-dialog-close]>Save</button>
        <button mat-raised-button color="accent" [mat-dialog-close]>Cancel</button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./equipment-form.component.css']
})
export class EquipmentFormComponent implements OnInit {

  moveData;
  shootData;
  commData;

  constructor(private equipmentService: EquipmentService) {
  }

  async ngOnInit() {
    this.commData = await this.equipmentService.getEquipmentTableData(EquipmentFileTypes.COMM);

    this.moveData = await this.equipmentService.getEquipmentTableData(EquipmentFileTypes.MOVE);

    this.shootData = await this.equipmentService.getEquipmentTableData(EquipmentFileTypes.SHOOT)
  }

}
