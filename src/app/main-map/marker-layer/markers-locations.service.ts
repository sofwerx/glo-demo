import { Injectable, OnInit } from '@angular/core';
import {
  Cartesian3,
  CesiumEvent,
  CoordinateConverter,
  MapEventsManagerService,
  MapsManagerService,
  PickOptions,
} from 'angular-cesium';
import { EventResult } from 'angular-cesium/src/angular-cesium/services/map-events-mananger/map-events-manager';
import { DisposableObservable } from 'angular-cesium/src/angular-cesium/services/map-events-mananger/disposable-observable';
import { Subject } from 'rxjs/Subject';
import { Mission } from '../../common/state/types';
import {lastMarkerLoc} from '../../common/state/state.service';

@Injectable({
  providedIn: 'root',
})
export class MarkersLocationsService {
  private mapClicks$: DisposableObservable<EventResult>;
  private mapEventManager: MapEventsManagerService;
  private markersLocations$: Subject<Mission> = new Subject<Mission>();
  private geoConverter: CoordinateConverter;

  constructor(private mapsManager: MapsManagerService) {}

  startMapListenToClicks() {
    if (this.mapEventManager === undefined) {
      this.getMapServices();
    }

    this.mapClicks$ = this.mapEventManager.register({
      event: CesiumEvent.LEFT_CLICK,
      pick: PickOptions.NO_PICK,
    });

    this.mapClicks$.subscribe(eventResult => {
      const nextPos = this.geoConverter.screenToCartesian3(eventResult.movement.endPosition, false);
      if (nextPos) {
        this.markersLocations$.next({ fromLocation: lastMarkerLoc, location: nextPos });
      }
    });

    return this.getMarkerLocations$();
  }

  getMarkerLocations$() {
    return this.markersLocations$;
  }

  stopListenToClicks() {
    if (this.mapClicks$) {
      this.mapClicks$.dispose();
    }
  }

  getMapServices(): void {
    this.mapEventManager = this.mapsManager.getMap().getMapEventsManager();
    this.geoConverter = this.mapsManager.getMap().getCoordinateConverter();
  }
}
