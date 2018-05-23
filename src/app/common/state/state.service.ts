import { Injectable } from '@angular/core';
import { Mission } from './types';
import { Subject } from 'rxjs/Subject';

// import {LoggerFactory, LoggerFactoryOptions, LFService, LogGroupRule, LogLevel} from "typescript-logging";
// export const factory = LFService.createNamedLoggerFactory("LoggerFactory", options);
// export const log = factory.getLogger();


export const SOFWERX_ORIGIN = Cesium.Cartesian3.fromDegrees(-82.4374762, 27.9561611);
export var lastMarkerLoc = SOFWERX_ORIGIN;
export var prevMission = null;

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public readonly missions$: Subject<Mission[]> = new Subject();
  private missions: Mission[] = [];
  private lastMarkerLoc = SOFWERX_ORIGIN;

  constructor() {}

  addMission(mission: Mission) {
    // if (this.missions.length > 0) {
    //   mission.fromLocation = prevMission.location;
    // } else {
    //   mission.fromLocation = SOFWERX_ORIGIN;
    // }
    mission.fromLocation = this.lastMarkerLoc;
    this.lastMarkerLoc = mission.location;
    this.missions.push({...mission, id: String(this.missions.length + 1)});
    this.missions$.next(this.missions);
    prevMission = mission;
  }
  // log.info(() => "Mission:" + mission);
}
