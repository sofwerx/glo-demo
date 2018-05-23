import { Cartesian3 } from 'angular-cesium';

export interface Mission {
  id?: string;
  missionName?: string;
  startDate?: Date;
  endDate?: Date;
  location: Cartesian3;
  fromLocation: Cartesian3;
  duration?: number;
  daysToDeployment?: number;
  pax?: number;
}
