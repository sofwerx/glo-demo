import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AcNotification, ActionType, Cartesian3 } from 'angular-cesium';
import { MarkersLocationsService } from './markers-locations.service';
import { StateService } from '../../common/state/state.service';
import { Mission } from '../../common/state/types';
import { lastMarkerLoc, prevMission} from '../../common/state/state.service';

// const SOFWERX_ORIGIN = Cesium.Cartesian3.fromDegrees(-82.4374762, 27.9561611);

@Component({
  selector: 'marker-layer',
  templateUrl: './marker-layer.component.html',
})
export class MarkerLayerComponent implements OnInit {
  private markers$: Subject<AcNotification> = new Subject();
  show = true;
  routeMaterial = new Cesium.PolylineGlowMaterialProperty({ color: Cesium.Color.LIGHTBLUE, glowPower: 0.1 });

  constructor(private markerLocationsService: MarkersLocationsService, private state: StateService) {
    Observable.merge(state.missions$, markerLocationsService.getMarkerLocations$()).subscribe(
      (missions: Mission | Mission[]) => {
        if (Array.isArray(missions)) {
          this.markers$.next({ actionType: ActionType.DELETE, id: 'current' });
          missions.forEach(mission => {
            this.markers$.next({
              actionType: ActionType.ADD_UPDATE,
              id: mission.id || 'current',
              entity: {
                position: mission.location,
                fromPosition: mission.fromLocation,
                image: '/assets/marker.png',
                text: mission.missionName || 'Phase 1',
              },
            });
          });
        } else {
          this.markers$.next({
            actionType: ActionType.ADD_UPDATE,
            id: 'current',
            entity: {
              position: missions.location,
              fromPosition: lastMarkerLoc,
              image: '/assets/marker.png',
              text: missions.missionName || 'Phase 1',
            },
          });
        }
      },
    );
  }

  ngOnInit() {}

  getRoute(source: Cartesian3, target: Cartesian3): Cartesian3[] {
    if (!target) {
      return [];
    }
    const edeges = [source, target];
    const midPoints = [];
    const maxHeight = 500000;
    const heights = [0.2, 0.4, 0.6, 0.8, 0.9, 1, 0.9, 0.8, 0.6, 0.4, 0.2];
    const quality = 12;
    for (let index = 1; index < quality; index++) {
      const factor = index / quality;
      const cartesian = Cesium.Cartesian3.lerp(...edeges, factor, new Cesium.Cartesian3());
      const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      cartographic.height = maxHeight * heights[index - 1];
      const point = Cesium.Cartographic.toCartesian(cartographic);
      midPoints.push(point);
    }
    return [source, ...midPoints, target];
  }
}
