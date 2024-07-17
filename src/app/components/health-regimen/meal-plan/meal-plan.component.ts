import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealPlanService } from '../../../services/meal-plan.service';
import { PatientService } from '../../../services/patient.service';
import { MealPlan } from '../../../models/meal-plan.model';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  mealPlans: MealPlan[] = [];
  mealPlansWithPatientNames: any[] = [];
  selectedMealPlan: MealPlan | null = null;
  selectedPatient: Patient | null = null;
  errorMessage: string = '';
  planText: string = '';

  constructor(
    private mealPlanService: MealPlanService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // write your logic here
  }

  getMealPlans(): void {
    // write your logic here
  }

  populatePatientNames(): void {
    // write your logic here
  }

  selectMealPlan(mealPlan: MealPlan): void {
    // write your logic here
  }

  getPatientDetails(patientId: number): void {
    // write your logic here
  }

  createMealPlan(): void {
    // write your logic here
  }

  updateMealPlan(mealPlan: MealPlan): void {
    // write your logic here
  }

  deleteMealPlan(mealPlan: MealPlan): void {
    // write your logic here
  }
}
