import { Injectable } from '@angular/core';
// import * as csv from '../../../assets/data-sources/move.csv';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

export interface EquipmentDataRow {
  availableQuantity: string;
  requiredQuantity: number;
  name: string;
  lin: string;

}

export enum EquipmentFileTypes {
  MOVE = 'move.csv',
  COMM = 'comm.csv',
  SHOOT = 'shoot.csv',
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {


  baseUrl = '/assets/data-sources/';

  constructor(private http: HttpClient) {

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  async getEquipmentTableData(type: EquipmentFileTypes) {
    const data: EquipmentDataRow[] = [];
    const fileRaw: string = await this.fetchCsv(this.baseUrl + type.toString());

    const fileRows = fileRaw.split('\n');

    fileRows.forEach((row, index) => {
      if (index > 1) {
        const rowFields = row.split(',');
        if (rowFields[0] && rowFields[1] && rowFields[8]) {
          data.push({
            lin: rowFields[0],
            name: rowFields[1],
            availableQuantity: rowFields[8],
            requiredQuantity: undefined,
          });
        }
      }
    });


    return data;


  }

  private async fetchCsv(url: string) {
    return await fetch(url)
      .then(function (response) {
        return response.text();
      });
  }
}
