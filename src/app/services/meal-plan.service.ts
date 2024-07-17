import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MealPlan } from '../models/meal-plan.model';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllMealPlans(): any {
    // write your logic here
    return null;
  }

  getMealPlanById(mealPlanId: number): any {
    // write your logic here
    return null;
  }

  createMealPlan(mealPlanData: MealPlan): any {
    // write your logic here
    return null;
  }

  updateMealPlan(mealPlanId: number, mealPlanData: MealPlan): any {
    // write your logic here
    return null;
  }

  deleteMealPlan(mealPlanId: number): any {
    // write your logic here
    return null;
  }
}
