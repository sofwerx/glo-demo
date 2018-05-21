import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AcNotification, ActionType, Cartesian3 } from 'angular-cesium';
import { MarkersLocationsService } from './markers-locations.service';
import { map } from 'rxjs/operators';

const SOFWERX_ORIGIN = Cesium.Cartesian3.fromDegrees(-82.4374762, 27.9561611);

@Component({
  selector: 'marker-layer',
  templateUrl: './marker-layer.component.html',
})
export class MarkerLayerComponent implements OnInit {
  private markers$: Observable<AcNotification>;
  show = true;
  routeMaterial = new Cesium.PolylineGlowMaterialProperty({color: Cesium.Color.LIGHTBLUE, glowPower: 0.1});

  constructor(private markerLocationsService: MarkersLocationsService) {
    this.markers$ = markerLocationsService.getMarkerLocations$().pipe(
      map(cartesian3 => ({
        actionType: ActionType.ADD_UPDATE,
        id: '1',
        entity: {
          position: cartesian3,
          image: '/assets/marker.png',
          text: 'Phase 1',
        },
      })),
    );
  }

  ngOnInit() {}

  getRoute(target: Cartesian3): Cartesian3[] {
    const edeges = [SOFWERX_ORIGIN, target];
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
    return [SOFWERX_ORIGIN, ...midPoints, target];
  }
}
