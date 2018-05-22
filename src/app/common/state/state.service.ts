import { Injectable } from '@angular/core';
import { Mission } from './types';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public readonly missions$: Subject<Mission[]> = new Subject();
  private missions: Mission[] = [];

  constructor() {}

  addMission(mission: Mission) {
    this.missions.push({...mission, id: String(this.missions.length + 1)});
    this.missions$.next(this.missions);
  }
}
