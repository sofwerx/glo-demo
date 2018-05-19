console.log("Script starting Cesium");

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMWI3Y2EzZS0wYWQwLTQzNDEtYWU3ZC0xMDFjODRjODdjMDMiLCJpZCI6MjY5LCJpYXQiOjE1MjI3ODY5NDV9.SaOpK9rwYkTsLFSzl-zBKCj-JOxU7Wo0vxIDnC7CSdo';

var viewer = new Cesium.Viewer('cesiumContainer',{
  animation : false,
  creditContainer: "divCredit",
  homeButton: false,
  instructionsInitiallyVisible : false,
  infoBox : false,
  selectionIndicator : false,
  timeline : false
});

const MGRS_PRECISION = 3;

function MissionPlan(name) {

  // Phase I -- these should go in an array of phase objs eventually
  this.cartographicPosition = null;
  this.mgrs = null;
  this.icon = null;
  this.startDate = new Date();
  this.duration = 0;

  Object.defineProperty(this, "name", {
    get: function() {
        return name;
    },
    set: function(newName) {
        name = newName;
    },
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(this, "endDate", {
    get: function() {
        return endDate;
    },
    set: function(newDate) {
        endDate = newDate;
    },
    enumerable: true,
    configurable: true
  });

  this.name = name;
  this.endDate = new Date();

  this.logName = function() {
    console.log(this.name);
  };

  this.formatMGRS = function() {
    var str = "";
    str = str + this.mgrs.substr(0,3) + " ";
    str = str + this.mgrs.substr(3,2) + " ";
    str = str + this.mgrs.substr(5,3) + " ";
    str = str + this.mgrs.substr(8);
    return(str);
  }
}

var curMissionPlan = new MissionPlan("");

var scene = viewer.scene;
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

handler.setInputAction(function(click) {
  console.log("Left Click detected");
  var pickedObject = scene.pick(click.position);
  var position = viewer.camera.pickEllipsoid(click.position);
  if(Cesium.defined(position)) {
    var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
    var longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
    var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
    var mgrs_str = mgrs.forward([longitude, latitude], MGRS_PRECISION);
    console.log("Left clicked at latitude " + latitude + ", longitude " + longitude + ", MGRS " + mgrs_str);

    curMissionPlan.cartographicPosition = cartographicPosition;
    curMissionPlan.mgrs = mgrs_str;
    if (curMissionPlan.icon) {
      curMissionPlan.icon.destroy();
    }
    curMissionPlan.icon = scene.primitives.add(new Cesium.BillboardCollection());
    curMissionPlan.icon.add({
      position: position,
      scale: 0.25,
      image: 'red_marker.png',
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    });
    beginMissionPlan();
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

console.log("Cesium Initialized");

//var menuDrawer = document.querySelector('.mdl-navigation__link-drawer');
var missionPlanningDialog = document.querySelector('#mission-planning-dialog');
var missionPlanningLink = document.querySelector('#mission-planning-link');

if (! missionPlanningDialog.showModal) {
  console.log("Registering missionPlanningDialog");
  dialogPolyfill.registerDialog(missionPlanningDialog);
}

closeBtn = missionPlanningDialog.querySelector('.close');
closeBtn.addEventListener('click', function() {
  console.log("Closing missionPlanningDialog");
  missionPlanningDialog.close();
});
missionPlanningDialog.querySelector('#missionName').addEventListener('change', function() {
  curMissionPlan.name = missionPlanningDialog.querySelector('#missionName').value;
});
var mStart =  missionPlanningDialog.querySelector('#missionStartDate');
var mEnd = missionPlanningDialog.querySelector('#missionEndDate');

function beginMissionPlan() {
    var d = document.querySelector('.mdl-layout__drawer.is-visible');
    if (d) {
      document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
    }

  // menuDrawer.toggleClass('is-visible');
  if (curMissionPlan.cartographicPosition == null) {
    console.log("Showing location selection prompt");
    var snackbarContainer = document.querySelector('#select-location-prompt');
    var data = {
      message: "Please select location by clicking on the map",
      timeout: 5000,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  } else {
    console.log("Showing missionPlanningDialog");
    var locField = missionPlanningDialog.querySelector('#missionLocation');
    locField.value = curMissionPlan.formatMGRS();

    mStart.value = curMissionPlan.startDate.toLocaleDateString();
    mEnd.value = curMissionPlan.endDate.toLocaleDateString();

    mname = missionPlanningDialog.querySelector('#missionName');
    mname.value = curMissionPlan.name;
    mname.select();
    missionPlanningDialog.showModal();
  }
};

missionPlanningLink.addEventListener('click', beginMissionPlan);


mStart.addEventListener('change', function() {
  [m, d, y] = mStart.value.split('/');
  curMissionPlan.startDate = new Date(y, m-1, d, 0, 0, 0);
  // curMissionPlan.startDate.setYear(y);
  // curMissionPlan.startDate.setMonth(m-1);
  // curMissionPlan.startDate.setDate(d);
});
mEnd.addEventListener('change', function() {
  [m, d, y] = mEnd.value.split('/');
  curMissionPlan.endDate = new Date(y, m-1, d, 0, 0, 0);
  // curMissionPlan.endDate.setYear(y);
  // curMissionPlan.endDate.setMonth(m-1);
  // curMissionPlan.endDate.setDate(d);
});

var phase1Dialog = document.querySelector('#phase1-dialog');
var phase1Link = document.querySelector('#phase1-link');
if (! phase1Dialog.showModal) {
  console.log("Registering phase1Dialog");
  dialogPolyfill.registerDialog(phase1Dialog);
}
var mStart1 = phase1Dialog.querySelector('#missionStartDate');
var mEnd1 = phase1Dialog.querySelector('#missionEndDate');


function planPhaseOne() {
  mStart1.innerText = curMissionPlan.startDate.toLocaleDateString();
  mEnd1.innerText = curMissionPlan.endDate.toLocaleDateString();

  console.log("Showing phase1Dialog");
  var mnHdg = phase1Dialog.querySelector('#mission-name-heading');
  mnHdg.innerText = curMissionPlan.name;
  var locField = phase1Dialog.querySelector('#missionLocation');
  locField.innerText = curMissionPlan.formatMGRS();
  var durationField = phase1Dialog.querySelector('#missionDuration');
  curMissionPlan.duration = Math.floor((curMissionPlan.endDate - curMissionPlan.startDate) / (1000*60*60*24));
  durationField.innerText = curMissionPlan.duration;
  phase1Dialog.showModal();
  missionPlanningDialog.close();
};

phase1Link.addEventListener('click', planPhaseOne);

phase1Dialog.querySelector('.close').addEventListener('click', function() {
  console.log("Closing phase1Dialog");
  missionPlanningDialog.showModal();
  phase1Dialog.close();
});
