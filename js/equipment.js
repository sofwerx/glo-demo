const EQUIPMENT_FILE = {"SHOOT": "http://localhost:8000/sourcedata/shoot.csv",
                        "MOVE": "http://localhost:8000/sourcedata/move.csv",
                        "COMM": "http://localhost:8000/sourcedata/comm.csv"
                      };

var missionEquipLink = document.querySelector('#missionEquipment');
var missionEquipDialog = document.querySelector('#mission-equipment-dialog');
var missionEquipTbody = document.querySelector('#mission-equipment-tbody');

function beginMissionEquipment() {
    console.log("Showing missionEquipDialog");

    var equipList = [];

    eTypes = ["SHOOT","MOVE","COMM"];
    for (i = 0; i < eTypes.length; ++i) {
      var equipType = eTypes[i];
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", EQUIPMENT_FILE[equipType], false);
      rawFile.onreadystatechange = function () {
          if(rawFile.readyState === 4) {
              if(rawFile.status === 200 || rawFile.status == 0) {
                  var allText = rawFile.responseText;
                  equipList = allText.split('\n');
              }
          }
      }
      rawFile.send(null);

      var missionEquipTableRow = document.createElement('tr');
      missionEquipTbody.appendChild(missionEquipTableRow);
      var missionEqipTableSep = document.createElement('td');
      missionEqipTableSep.setAttribute("span",4);
      missionEqipTableSep.setAttribute("style","font-weight: bold");
      missionEqipTableSep.appendChild(document.createTextNode(equipType));
      componentHandler.upgradeElement(missionEqipTableSep);
      missionEquipTableRow.appendChild(missionEqipTableSep);

      var missionEquipTableRow = document.createElement('tr');
      missionEquipTbody.appendChild(missionEquipTableRow);

      equipList.shift();
      while(row = equipList.shift()) {
        var missionEquipTableRow = document.createElement('tr');
        missionEquipTbody.appendChild(missionEquipTableRow);

        flds = parseCSV(row);

        var missionEqipTableData1 = document.createElement('td');
        missionEqipTableData1.appendChild(document.createTextNode(" " + flds[8]));
        componentHandler.upgradeElement(missionEqipTableData1);
        missionEquipTableRow.appendChild(missionEqipTableData1);

        var missionEquipTableData2 = document.createElement('td');
        qtyInput = missionEquipTableData2.appendChild(document.createElement('input'));
        qtyInput.type = "text";
        qtyInput.value = "";
        qtyInput.className = "mdl-textfield__input";
        componentHandler.upgradeElement(missionEquipTableData2);
        missionEquipTableRow.appendChild(missionEquipTableData2);

        var missionEquipTableData3 = document.createElement('td');
        missionEquipTableData3.appendChild(document.createTextNode(" " + flds[1]));
        missionEquipTableData3.className = "mdl-data-table__cell--non-numeric";
        componentHandler.upgradeElement(missionEquipTableData3);
        missionEquipTableRow.appendChild(missionEquipTableData3);

        var missionEquipTableData4 = document.createElement('td');
        missionEquipTableData4.appendChild(document.createTextNode(" " + flds[0]));
        missionEquipTableData4.className = "mdl-data-table__cell--non-numeric";
        componentHandler.upgradeElement(missionEquipTableData4);
        missionEquipTableRow.appendChild(missionEquipTableData4);
      }
    }

    missionEquipDialog.showModal();
}

missionEquipLink.addEventListener('click', beginMissionEquipment);

equipCloseBtn = missionEquipDialog.querySelector('#missionEquipmentBackBtn');
equipCloseBtn.addEventListener('click', function() {
  // TODO: save changes to ration quantities, validate totals
  missionEquipDialog.close();
});

// Parse a CSV row, accounting for commas inside quotes
function parseCSV(row){
  var insideQuote = false,
      entries = [],
      entry = [];
  row.split('').forEach(function (character) {
    if(character === '"') {
      insideQuote = !insideQuote;
    } else {
      if(character == "," && !insideQuote) {
        entries.push(entry.join(''));
        entry = [];
      } else {
        entry.push(character);
      }
    }
  });
  entries.push(entry.join(''));
  return entries;
}
