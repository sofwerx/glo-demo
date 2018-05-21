const MGRS_PRECISION = 3;
const MSEC_TO_DAYS = (1000*60*60*24);

function MissionPlan(name) {

  // Phase I -- these should go in an array of phase objs eventually
  this.cartographicPosition = null;
  this.mgrs = null;
  this.icon = null;
  this.startDate = new Date();
  this.duration = 0;
  this.leadTime = 0;

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
