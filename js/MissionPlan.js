// needs mgrs.js

function MissionPlan(name) {

  // Phase I -- these should go in an array of phase objs eventually
  this.cartographicPosition = null;
  this.mgrs = null;
  this.icon = null;
  this.startDate = new Date();
  this.duration = 0;
  this.deploymentDays = 0;
  this.pax = 0;
  this.meals = [];

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

  this.populateMeals = function() {
    /*
    **************************
     Ruleset:
     Days 1-3 = FFF
     Days 4-20 = MMM
     Days 21-30 = UMU
    **************************
    */

    // how many meals per case
    const FSR_PER_CASE = 27;
    const MRE_PER_CASE = 12;
    const UGR_PER_CASE = 50;

    daysCovered = 0;

    console.log("Mission duration: " + this.duration);
    if (this.deploymentDays < 4) {
      var fsrDays = (this.duration < 3 ? this.duration : 3);
      console.log("F-F-F days: " + fsrDays);

      this.meals.push({
        cycle: "F-F-F",
        duration: fsrDays,
        menus: [{
          qty: Math.ceil((this.pax * 3 * fsrDays) / FSR_PER_CASE),
          description: "FSR (cases)"
        }]
      });
      daysCovered += fsrDays;
    }

    if (this.duration > 3) {
      var mreDays = (this.duration < 20 ? this.duration : 20) - daysCovered;
      console.log("M-M-M days: " + mreDays);

      this.meals.push({
        cycle: "M-M-M",
        duration: mreDays - daysCovered,
        menus: [{
          qty: Math.ceil((this.pax * 3 * mreDays) / MRE_PER_CASE),
          description: "MRE (cases)"
        }]
      });
      daysCovered += mreDays;
    }

    if (this.duration > 20) {
      ummDays = (this.duration < 60 ? this.duration : 60) - daysCovered;
      console.log("U-M-M days: " + ummDays);

      this.meals.push({
        cycle: "U-M-M",
        duration: ummDays - daysCovered,
        menus: [{
          qty: Math.ceil((this.pax * ummDays) / UGR_PER_CASE),
          description: "UGR H&S (cases)"
        },
        {
          qty: Math.ceil((this.pax * 2 * ummDays) / MRE_PER_CASE),
          description: "MRE (cases)"
        }]
      });
      daysCovered += ummDays;
    }

    if (this.duration > 60) {
      umuDays = this.duration - daysCovered;
      console.log("U-M-U days: " + umuDays);

      this.meals.push({
        cycle: "U-M-U",
        duration: umuDays - daysCovered,
        menus: [{
          qty: Math.ceil((this.pax * umuDays) / UGR_PER_CASE),
          description: "UGR H & S (cases)"
        },
        {
          qty: Math.ceil((this.pax * umuDays) / MRE_PER_CASE),
          description: "MRE (cases)"
        },
        {
          qty: Math.ceil((this.pax * umuDays) / UGR_PER_CASE),
          description: "UGR-A (cases)"
        }]
      });
      daysCovered += umuDays;
    }

    console.log("Mission duration: " + this.duration + ", food days covered: " + daysCovered);
  }

  this.formatMGRS = function() {
    var str = "";
    str = str + this.mgrs.substr(0,3) + " ";
    str = str + this.mgrs.substr(3,2) + " ";
    str = str + this.mgrs.substr(5,3) + " ";
    str = str + this.mgrs.substr(8);
    return(str);
  }
}
