import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MealsService, MealTableRow } from './meals.service';
import { MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'meals-form',
  template: `
    <div class="form-container">
      <h2 mat-dialog-title>Meals</h2>
      <div class="container">
        <table mat-table #table [dataSource]="dataSource">
          <!-- Position Column -->
          <ng-container matColumnDef="missionDays">
            <th mat-header-cell *matHeaderCellDef>Mission Days</th>
            <td mat-cell *matCellDef="let element"> {{element.missionDays}}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="rationCycle">
            <th mat-header-cell *matHeaderCellDef> Ration cycle</th>
            <td mat-cell *matCellDef="let element"> {{element.rationCycle}}</td>
          </ng-container>

          <!-- Weight Column -->
          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef> Quantity</th>
            <td mat-cell *matCellDef="let element">
              <input class="input" matInput placeholder="Enter Quantity" [type]="'number'" [value]="element.quantity">
            </td>
          </ng-container>

          <!-- Symbol Column -->
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef> Description</th>
            <td mat-cell *matCellDef="let element"> {{element.description}}</td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        <mat-paginator #paginator
                       [pageSize]="5"
                       [showFirstLastButtons]="true">
        </mat-paginator>
      </div>
      <div style="flex-grow: 1"></div>
      <mat-dialog-actions>
        <button mat-raised-button color="accent" [mat-dialog-close]>Save</button>
        <button mat-raised-button color="accent" [mat-dialog-close]>Cancel</button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./meals-form.component.css']
})
export class MealsFormComponent implements OnInit {
  displayedColumns = ['missionDays', 'rationCycle', 'quantity', 'description'];
  dataSource: MatTableDataSource<MealTableRow>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private mealService: MealsService,
              @Inject(MAT_DIALOG_DATA) private data: { duration, deploymentDays, pax }
  ) {
  }

  ngOnInit() {
    const {pax, deploymentDays, duration} = this.data;
    const mealTableRows = this.mealService.getMealsDataTableFormat(duration || 1, deploymentDays || 1, pax || 0);
    this.dataSource = new MatTableDataSource<MealTableRow>(mealTableRows);
    this.dataSource.paginator = this.paginator;

  }


}
