

var logisticReqsLink = document.querySelector('#logisticReqs');
var missionMealsDialog = document.querySelector('#mission-meals-dialog');
var missionMealsTbody = document.querySelector('#mission-meals-tbody');

var daystart;

function beginMissionMeals() {
    console.log("Showing missionMealsDialog");

    daystart = 1;

    curMissionPlan.populateMeals();
    console.log("curMissionPlan.meals = " + JSON.stringify(curMissionPlan.meals));

    // TODO: remove previous table rows before adding new ones

    // ???
    // children = missionMealsTbody.childNodes;
    // len = children.length;
    // for (var i = 0; i < len; ++i) {
    //   missionMealsTbody.removeChild(children[i]);
    // }

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

logisticReqsLink.addEventListener('click', beginMissionMeals);

mealsCloseBtn = missionMealsDialog.querySelector('#missionMealsBackBtn');
mealsCloseBtn.addEventListener('click', function() {
  // TODO: save changes to ration quantities, validate totals
  missionMealsDialog.close();
});
