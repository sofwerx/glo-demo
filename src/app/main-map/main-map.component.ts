import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewerConfiguration, MapLayerProviderOptions, MapsManagerService } from 'angular-cesium';
import { CartoDBImageryProvider } from '../common/cartodb-imagery-provider';

@Component({
  selector: 'main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css'],
  providers: [ViewerConfiguration],
})
export class MainMapComponent implements OnInit, AfterViewInit {
  constructor(private viewrConf: ViewerConfiguration, private mapManager: MapsManagerService) {
    viewrConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: false,
      animation: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
    };
  }

  ngOnInit() {}

  ngAfterViewInit() {
    const viewer = this.mapManager.getMap().getCesiumViewer();
    viewer.imageryLayers.addImageryProvider(
      new CartoDBImageryProvider({
        url: 'http://{s}.basemaps.cartocdn.com/spotify_dark/{z}/{x}/{y}.png',
        credit: 'Basemap courtesy of CartoDB',
      }),
    );
  }
}
