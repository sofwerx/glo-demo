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

const MGRS_PRECISION = 3;
const MSEC_TO_DAYS = (1000*60*60*24);

//var menuDrawer = document.querySelector('.mdl-navigation__link-drawer');
var missionPlanningDialog = document.querySelector('#mission-planning-dialog');
var missionPlanningLink = document.querySelector('#mission-planning-link');
var logisticReqsLink = document.querySelector('#logisticReqs');
var missionMealsDialog = document.querySelector('#mission-meals-dialog');
var missionMealsTbody = document.querySelector('#mission-meals-tbody');
var totalPAX = document.querySelector('#totalPAX');

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

var daystart;

function beginMissionMeals() {
    console.log("Showing missionMealsDialog");

    daystart = 1;

    curMissionPlan.populateMeals();
    console.log("curMissionPlan.meals = " + JSON.stringify(curMissionPlan.meals));

    meals = JSON.parse(JSON.stringify(curMissionPlan.meals));
    while (meal = meals.shift()) {
    // curMissionPlan.meals.forEach(function(meal) {
      var missionMealsTableRow = document.createElement('tr');
      missionMealsTbody.appendChild(missionMealsTableRow);

      dayend = daystart + meal.duration - 1;

      var missionMealsTableData1 = document.createElement('td');
      missionMealsTableData1.appendChild(document.createTextNode( " " + daystart + "-" + dayend));
      missionMealsTableData1.className = "mdl-data-table__cell--non-numeric";
      componentHandler.upgradeElement(missionMealsTableData1);
      missionMealsTableRow.appendChild(missionMealsTableData1);

      daystart = dayend + 1

      var missionMealsTableData2 = document.createElement('td');
      missionMealsTableData2.appendChild(document.createTextNode(meal.cycle));
      missionMealsTableData2.className = "mdl-data-table__cell--non-numeric";
      componentHandler.upgradeElement(missionMealsTableData2);
      missionMealsTableRow.appendChild(missionMealsTableData2);

      var menus = JSON.parse(JSON.stringify(meal.menus));
      while (menu = menus.shift()) {
      // menus.forEach(function(menu) {

        if(meal.menus.length > 1) {
          missionMealsTableRow = document.createElement('tr');
          missionMealsTbody.appendChild(missionMealsTableRow);

          var missionMealsTableData1 = document.createElement('td');
          missionMealsTableData1.appendChild(document.createTextNode(''));
          missionMealsTableData1.className = "mdl-data-table__cell--non-numeric";
          componentHandler.upgradeElement(missionMealsTableData1);
          missionMealsTableRow.appendChild(missionMealsTableData1);

          var missionMealsTableData2 = document.createElement('td');
          missionMealsTableData2.appendChild(document.createTextNode(''));
          missionMealsTableData2.className = "mdl-data-table__cell--non-numeric";
          componentHandler.upgradeElement(missionMealsTableData2);
          missionMealsTableRow.appendChild(missionMealsTableData2);
	      }

        var missionMealsTableData3 = document.createElement('td');
//        missionMealsTableData3.appendChild(document.createTextNode(menu.qty));
        qtyInput = missionMealsTableData3.appendChild(document.createElement('input'));
        qtyInput.type = "text";
        qtyInput.value = menu.qty;
        qtyInput.className = "mdl-textfield__input";
        missionMealsTableData3.className = "mdl-data-table__cell--non-numeric";
        componentHandler.upgradeElement(missionMealsTableData3);
        missionMealsTableRow.appendChild(missionMealsTableData3);

        var missionMealsTableData4 = document.createElement('td');
        missionMealsTableData4.appendChild(document.createTextNode(menu.description));
        missionMealsTableData4.className = "mdl-data-table__cell--non-numeric";
        componentHandler.upgradeElement(missionMealsTableData4);
        missionMealsTableRow.appendChild(missionMealsTableData4);
      }
    }

    missionMealsDialog.showModal();
}

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

logisticReqsLink.addEventListener('click', beginMissionMeals);

mStart.addEventListener('change', function() {
  [m, d, y] = mStart.value.split('/');
  curMissionPlan.startDate = new Date(y, m-1, d, 0, 0, 0);
});
mEnd.addEventListener('change', function() {
  [m, d, y] = mEnd.value.split('/');
  curMissionPlan.endDate = new Date(y, m-1, d, 0, 0, 0);
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
  console.log("Showing phase1Dialog");

  mStart1.innerText = curMissionPlan.startDate.toLocaleDateString();
  mEnd1.innerText = curMissionPlan.endDate.toLocaleDateString();
  if (!curMissionPlan.name) {
    curMissionPlan.name = "(MISSION NAME)"
  }

  var mnHdg = phase1Dialog.querySelector('#missionNameHeading');
  mnHdg.innerText = curMissionPlan.name;
  var locField = phase1Dialog.querySelector('#missionLocation');
  locField.innerText = curMissionPlan.formatMGRS();
  var durationField = phase1Dialog.querySelector('#missionDuration');
  curMissionPlan.duration = Math.floor((curMissionPlan.endDate - curMissionPlan.startDate) / MSEC_TO_DAYS);
  durationField.innerText = curMissionPlan.duration;
  curMissionPlan.deploymentDays = Math.ceil((curMissionPlan.startDate - Date.now()) / MSEC_TO_DAYS);
  var deployField = phase1Dialog.querySelector('#deploymentDays');
  deployField.innerText = curMissionPlan.deploymentDays;

  phase1Dialog.showModal();
  missionPlanningDialog.close();
};

function changeTotalPAX() {
  console.log("PAX: " + totalPAX.value);
  curMissionPlan.pax = totalPAX.value;
}

totalPAX.addEventListener('change', changeTotalPAX);

phase1Link.addEventListener('click', planPhaseOne);

mealsCloseBtn = missionMealsDialog.querySelector('#missionMealsBackBtn');
mealsCloseBtn.addEventListener('click', function() {
  missionMealsDialog.close();
});

phase1Dialog.querySelector('.close').addEventListener('click', function() {
  console.log("Closing phase1Dialog");
  missionPlanningDialog.showModal();
  phase1Dialog.close();
});
