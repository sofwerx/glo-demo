import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AcNotification, ActionType, Cartesian3 } from "angular-cesium";
import { MarkersLocationsService } from "./markers-locations.service";
import { map } from "rxjs/operators";

declare var Cesium;

@Component({
  selector: 'marker-layer',
  templateUrl: './marker-layer.component.html',
})
export class MarkerLayerComponent implements OnInit {

  private markers$: Observable<AcNotification>;
  show = true;

  constructor(private markerLocationsService: MarkersLocationsService) {
    this.markers$ = markerLocationsService.getMarkerLocations$()
      .pipe(
        map(cartesian3 => ({
            actionType: ActionType.ADD_UPDATE,
            id: '1',
            entity: {
              position: cartesian3,
              image: '/assets/marker.png',
              text: 'Phase 1'
            }
          })
        )
      );
  }

  ngOnInit() {
  }

}
