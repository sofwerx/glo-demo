import { Injectable } from '@angular/core';
import { st } from "@angular/core/src/render3";

interface MealData {
  cycle: string;
  duration: number;
  menus: Menu[];
  startDay?: number;
  endDay?: number;
}

interface Menu {
  description: string;
  qty: number;
}

export interface MealTableRow {
  missionDays: string;
  rationCycle: string;
  quantity: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor() {
  }

  x() {
    return 1;
  }


  populateMeals(duration: number, deploymentDays: number, pax: number) {
    const meals = [];
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

    let daysCovered = 0;

    if (deploymentDays < 4) {
      const fsrDays = (duration < 3 ? duration : 3);

      meals.push({
        cycle: 'F-F-F',
        duration: fsrDays,
        menus: [{
          qty: Math.ceil((pax * 3 * fsrDays) / FSR_PER_CASE),
          description: 'FSR (cases)'
        }]
      });
      daysCovered += fsrDays;
    }

    if (duration > 3) {
      const mreDays = (duration < 20 ? duration : 20) - daysCovered;

      meals.push({
        cycle: 'M-M-M',
        duration: mreDays,
        menus: [{
          qty: Math.ceil((pax * 3 * mreDays) / MRE_PER_CASE),
          description: 'MRE (cases)'
        }]
      });
      daysCovered += mreDays;
    }

    if (duration > 20) {
      const ummDays = (duration < 60 ? duration : 60) - daysCovered;

      meals.push({
        cycle: 'U-M-M',
        duration: ummDays,
        menus: [{
          qty: Math.ceil((pax * ummDays) / UGR_PER_CASE),
          description: 'UGR H&S (cases)'
        },
          {
            qty: Math.ceil((pax * 2 * ummDays) / MRE_PER_CASE),
            description: 'MRE (cases)'
          }]
      });
      daysCovered += ummDays;
    }

    if (duration > 60) {
      const umuDays = duration - daysCovered;

      meals.push({
        cycle: 'U-M-U',
        duration: umuDays,
        menus: [{
          qty: Math.ceil((pax * umuDays) / UGR_PER_CASE),
          description: 'UGR H & S (cases)'
        },
          {
            qty: Math.ceil((pax * umuDays) / MRE_PER_CASE),
            description: 'MRE (cases)'
          },
          {
            qty: Math.ceil((pax * umuDays) / UGR_PER_CASE),
            description: 'UGR-A (cases)'
          }]
      });
      daysCovered += umuDays;
    }

    return meals;
  }


  getMealsDataTableFormat(duration: number, deploymentDays: number, pax: number): MealTableRow[] {

    const meals: MealData[] = this.populateMeals(duration, deploymentDays, pax);
    const mealsDataRows: MealTableRow[] = [];

    meals.forEach((meal, index) => {
      const lastMeal = index === 0 ? {endDay: 0} : meals[index - 1];

      // For mission days
      meal.startDay = lastMeal.endDay + 1;
      meal.endDay = lastMeal.endDay + meal.duration;

      meal.menus.forEach(menu => {
        const missionDays = `${ meal.startDay}-${meal.endDay}`;
        mealsDataRows.push({
          description: menu.description,
          quantity: menu.qty,
          rationCycle: meal.cycle,
          missionDays,
        });
      });
    });

    return mealsDataRows;
  }
}
