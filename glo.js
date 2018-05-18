console.log("Script starting Cesium");

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMWI3Y2EzZS0wYWQwLTQzNDEtYWU3ZC0xMDFjODRjODdjMDMiLCJpZCI6MjY5LCJpYXQiOjE1MjI3ODY5NDV9.SaOpK9rwYkTsLFSzl-zBKCj-JOxU7Wo0vxIDnC7CSdo';

var viewer = new Cesium.Viewer('cesiumContainer',{
  instructionsInitiallyVisible : false,
  timeline : false,
  terrainProvider : new Cesium.CesiumTerrainProvider({
      url: Cesium.IonResource.fromAssetId(1)
  })
});

function MissionPlan(name) {
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

  this.name = name;

  this.logName = function() {
    console.log(this.name);
  };
}


var center = Cesium.Cartesian3.fromDegrees(-82.5, 35.3);
viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, 20000000.0));

console.log("Cesium Initialized");

var missionPlanningDialog = document.querySelector('#mission-planning-dialog');
var missionPlanningLink = document.querySelector('#mission-planning-link');
var curMissionPlan = new MissionPlan("ENTER MISSION NAME");

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

missionPlanningLink.addEventListener('click', function() {
  console.log("Showing missionPlanningDialog");
  mname = missionPlanningDialog.querySelector('#missionName');
  mname.value = curMissionPlan.name;
  missionPlanningDialog.showModal();
});


var phase1Dialog = document.querySelector('#phase1-dialog');
var phase1Link = document.querySelector('#phase1-link');
if (! phase1Dialog.showModal) {
  console.log("Registering phase1Dialog");
  dialogPolyfill.registerDialog(phase1Dialog);
}
phase1Link.addEventListener('click', function() {
  console.log("Showing phase1Dialog");
  var mnHdg = phase1Dialog.querySelector('#mission-name-heading');
  mnHdg.innerText = curMissionPlan.name;
  phase1Dialog.showModal();
});
phase1Dialog.querySelector('.close').addEventListener('click', function() {
  console.log("Closing phase1Dialog");
  phase1Dialog.close();
});
