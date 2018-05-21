import { Component, OnInit } from '@angular/core';
import { ViewerConfiguration } from "angular-cesium";

@Component({
  selector: 'main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css'],
  providers: [ViewerConfiguration],
})
export class MainMapComponent implements OnInit {

  constructor(private viewrConf: ViewerConfiguration) {
    viewrConf.viewerOptions = {
      selectionIndicator : false,
      timeline : false,
      infoBox : false,
      animation : false,
      navigationHelpButton : false,
      navigationInstructionsInitiallyVisible : false,
    };
  }

  ngOnInit() {
  }

}
