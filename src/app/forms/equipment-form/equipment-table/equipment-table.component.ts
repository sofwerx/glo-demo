import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { EquipmentDataRow, EquipmentFileTypes } from "../equipment.service";

@Component({
  selector: 'equipment-table',
  template: `
    <div class="container">
      <mat-form-field>
        <input matInput (keyup)="applyFilter($event.target.value)" [placeholder]="searchText">
      </mat-form-field>
      <table mat-table #table matSort [dataSource]="dataSource">

        <!-- Checkbox Column -->
        <ng-container matColumnDef="select">
          <th mat-header-cell *matHeaderCellDef>
            <mat-checkbox (change)="$event ? masterToggle() : null"
                          [checked]="selection.hasValue() && isAllSelected()"
                          [indeterminate]="selection.hasValue() && !isAllSelected()">
            </mat-checkbox>
          </th>
          <td mat-cell *matCellDef="let row">
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)="$event ? selection.toggle(row) : null"
                          [checked]="selection.isSelected(row)">
            </mat-checkbox>
          </td>
        </ng-container>

        <!-- Position Column -->
        <ng-container matColumnDef="lin">
          <th mat-header-cell mat-sort-header *matHeaderCellDef>Lin</th>
          <td mat-cell *matCellDef="let element"> {{element.lin}}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell mat-sort-header *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let element"> {{element.name}}</td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="availableQuantity">
          <th mat-header-cell mat-sort-header *matHeaderCellDef> Available Quantity</th>
          <td mat-cell *matCellDef="let element">
            {{element.availableQuantity}}
          </td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="requiredQuantity">
          <th mat-header-cell mat-sort-header *matHeaderCellDef> Required Quantity</th>
          <td mat-cell *matCellDef="let element">
            <input class="input" matInput placeholder="Enter Quantity" [type]="'number'"
                   [value]="element.requiredQuantity">
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="selection.toggle(row)"></tr>
      </table>
      <mat-paginator #paginator
                     [pageSize]="5"
                     [showFirstLastButtons]="true">
      </mat-paginator>
    </div>
  `,
  styleUrls: ['./equipment-table.component.css']
})
export class EquipmentTableComponent implements OnInit, OnChanges {

  @Input()
  dataTable: EquipmentDataRow[];

  @Input()
  searchText: EquipmentDataRow[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') commPaginator: MatPaginator;
  displayedColumns = ['lin', 'name', 'availableQuantity', 'requiredQuantity'];
  dataSource: MatTableDataSource<EquipmentDataRow> = new MatTableDataSource<EquipmentDataRow>([]);
  selection = new SelectionModel<EquipmentDataRow>(true, []);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<EquipmentDataRow>(this.dataTable);
    this.dataSource.paginator = this.commPaginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataTable']) {
      this.dataSource = new MatTableDataSource<EquipmentDataRow>(changes['dataTable'].currentValue);
      this.dataSource.paginator = this.commPaginator;
      this.dataSource.sort = this.sort;
    }
  }

}
