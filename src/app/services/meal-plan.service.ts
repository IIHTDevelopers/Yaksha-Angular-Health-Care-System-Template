import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealPlan } from '../models/meal-plan.model';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  public apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Meal Plan-related methods
  getAllMealPlans(): Observable<MealPlan[]> {
    return this.http.get<MealPlan[]>(`${this.apiUrl}/mealPlans`);
  }

  getMealPlanById(mealPlanId: number): Observable<MealPlan> {
    return this.http.get<MealPlan>(`${this.apiUrl}/mealPlans/${mealPlanId}`);
  }

  createMealPlan(mealPlanData: MealPlan): Observable<MealPlan> {
    return this.http.post<MealPlan>(`${this.apiUrl}/mealPlans`, mealPlanData);
  }

  updateMealPlan(mealPlanId: number, mealPlanData: MealPlan): Observable<MealPlan> {
    return this.http.put<MealPlan>(`${this.apiUrl}/mealPlans/${mealPlanId}`, mealPlanData);
  }

  deleteMealPlan(mealPlanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/mealPlans/${mealPlanId}`);
  }
}
